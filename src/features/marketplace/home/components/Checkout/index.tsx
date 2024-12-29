import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { ColorModeButton } from '@/components/ui/color-mode';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { formatCurrency } from '@/features/add-other/format-currency';
import { useCartStore } from '@/store/cart-store';
import { usePinpoint } from '@/store/pinpoint';
import { useRatesStore } from '@/store/rates';
import {
  Box,
  createListCollection,
  DialogRoot,
  Fieldset,
  Flex,
  Group,
  HStack,
  Image,
  Input,
  Table,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { LuMapPin, LuMapPinOff } from 'react-icons/lu';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useShipmentAddress } from '../../hooks/use-shipment-address';
import { useGetRates } from '../../hooks/useGetRates';
import { getAreaId } from '../../services/rates';
import DeliveryMethod from '../Form/deliveryMethod';
import PopUpLocation from './popUpLocation';
import { useEffect } from 'react';
import { useCostRateStore } from '@/store/cost-rate';
import { useCheckout } from '../../hooks/use-checkout';
import { Button } from '@/components/ui/button';
import { AllFields, useCustomerDetailStore } from '@/store/customer-detail';

export default function CheckoutPages() {
  const { totalPrice, products, productImage } = useCartStore();
  const { cost } = useCostRateStore();
  const { onSubmit, rates } = useGetRates();

  const { ratesCourier, isSelected } = useCostRateStore();

  const {
    provinsi,
    kabupaten,
    postalCodes,
    setSelectedProvinsi,
    setSelectedKabupaten,
    kelurahan,
    kecamatan,
    setSelectedKecamatan,
    setSelectedKelurahan,
    removeKotaKabupaten,
    errors,
    register,
    setValue,
    watch,
  } = useShipmentAddress();

  const { pinpoint } = usePinpoint();
  const { setDestinationAreaId } = useRatesStore();

  const allFields = watch() as AllFields;

  const { isGettingCheckout, onSubmit: onSubmitCheckout } = useCheckout();

  const { setCustomerDetails } = useCustomerDetailStore();

  const requiredFields = [
    'name',
    'phone',
    'address',
    'province',
    'city_district',
    'subdistrict',
    'village',
    'postal_code',
    'latitude',
    'longitude',
  ];

  const isAllFilled = requiredFields.every((field) => allFields[field]);

  const cityDistrictValue = watch('city_district');
  const subdistrictValue = watch('subdistrict');
  const postalCodeValue = watch('postal_code');

  const input =
    cityDistrictValue + ' ' + subdistrictValue + ' ' + postalCodeValue;

  useEffect(() => {
    const fetchArea = async () => {
      if (isAllFilled) {
        try {
          const areaId = await getAreaId(input);
          setDestinationAreaId(areaId);
          setCustomerDetails(allFields);
        } catch (error) {
          console.error('Failed to fetch area ID:', error);
        }
      }
    };

    fetchArea();
  }, [isAllFilled]);

  const provinsiCollection = createListCollection({
    items: provinsi.map((prov) => ({
      label: prov.nama,
      value: prov.id,
    })),
  });

  const kabupatenCollection = createListCollection({
    items: kabupaten.map((kab) => ({
      label: kab.nama,
      value: Number(kab.id),
    })),
  });

  const kecamatanCollection = createListCollection({
    items: kecamatan.map((kab) => ({
      label: kab.nama,
      value: kab.id,
    })),
  });

  const kelurahanCollection = createListCollection({
    items: kelurahan.map((kab) => ({
      label: kab.nama,
      value: kab.id,
    })),
  });

  const postalCodeCollection = createListCollection({
    items: postalCodes.map((pos) => ({
      label: pos.code,
      value: Number(pos.code),
    })),
  });

  return (
    <Box padding="10px 100px" pb="100px">
      <Text fontSize="30px" fontWeight="medium" mb="20px">
        Checkout <ColorModeButton />
      </Text>
      <Flex gap="20px">
        {/* Formulir */}
        <Box display="flex" flexDir="column" gap="20px" width="4/6">
          {/* Status Checkout */}
          <Flex borderBottom="1px solid gainsboro">
            <Box
              display="flex"
              flexDir="column"
              padding="10px 20px"
              borderBottom="2px solid blue"
              justifyContent="start"
              alignItems="start"
            >
              <Text fontWeight="medium">Info Pengiriman</Text>
            </Box>
          </Flex>

          {/* Form Alamat Pengiriman */}
          <Flex
            flexDir="column"
            padding="20px"
            rounded="lg"
            gap="20px"
            border="1px solid gainsboro"
          >
            <Text fontSize="20px" fontWeight="medium">
              Alamat Pengiriman
            </Text>
            <Fieldset.Root width="full">
              <Field
                label="Nama Penerima"
                invalid={!!errors.name || !!errors.name}
                errorText={errors.name?.message || errors.name?.message}
              >
                <Input
                  {...register('name')}
                  px="20px"
                  border="1px solid gray"
                  name="name"
                />
              </Field>

              <Field
                label="Email"
                invalid={!!errors.email || !!errors.email}
                errorText={errors.email?.message || errors.email?.message}
              >
                <Input
                  {...register('email')}
                  px="20px"
                  border="1px solid gray"
                  type="email"
                />
              </Field>

              <Field
                label="Phone"
                invalid={!!errors.phone || !!errors.phone}
                errorText={errors.phone?.message || errors.phone?.message}
              >
                <Group
                  width="full"
                  border="1px solid gray"
                  rounded="md"
                  attached
                >
                  <Input
                    {...register('phone')}
                    px="20px"
                    placeholder="Phone number..."
                    type="tel"
                  />
                </Group>
              </Field>
            </Fieldset.Root>
            <Field
              label="Provinsi"
              invalid={!!errors.province || !!errors.province}
              errorText={errors.province?.message || errors.province?.message}
            >
              <SelectRoot
                collection={provinsiCollection}
                size="sm"
                disabled={!provinsi.length}
                {...register('province')}
                onValueChange={(details) => {
                  const selectedValue = details?.value
                    ? Number(details.value)
                    : 0;
                  const selectedLabel = details?.items
                    ? details.items[0]?.label
                    : '';

                  setSelectedProvinsi(selectedValue);
                  setValue('province', selectedLabel);
                }}
              >
                <SelectTrigger>
                  <SelectValueText
                    placeholder={
                      provinsi.length
                        ? 'Pilih Provinsi'
                        : 'Pilih provinsi terlebih dahulu'
                    }
                  />
                </SelectTrigger>
                <SelectContent position="absolute" zIndex={2} w="100%">
                  {provinsiCollection.items.map((kab) => (
                    <SelectItem item={kab} key={kab.value}>
                      {kab.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Field
              label="Kabupaten/Kota"
              invalid={!!errors.city_district || !!errors.city_district}
              errorText={
                errors.city_district?.message || errors.city_district?.message
              }
            >
              <SelectRoot
                collection={kabupatenCollection}
                size="sm"
                disabled={!kabupaten.length}
                onValueChange={(details) => {
                  const selectedValue = details?.value
                    ? Number(details.value)
                    : 0;
                  const selectedLabel = details?.items
                    ? details.items[0]?.label
                    : '';

                  setSelectedKabupaten(selectedValue);
                  setValue('city_district', selectedLabel);
                }}
              >
                <SelectTrigger>
                  <SelectValueText
                    placeholder={
                      kabupaten.length
                        ? 'Pilih Kabupaten/Kota'
                        : 'Pilih provinsi terlebih dahulu'
                    }
                  />
                </SelectTrigger>
                <SelectContent position="absolute" zIndex={2} w="100%">
                  {kabupatenCollection.items.map((kab) => (
                    <SelectItem item={kab} key={kab.value}>
                      {kab.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field
              label="Kecamatan"
              invalid={!!errors.subdistrict || !!errors.subdistrict}
              errorText={
                errors.subdistrict?.message || errors.subdistrict?.message
              }
            >
              <SelectRoot
                disabled={!kecamatan.length}
                collection={kecamatanCollection}
                size="sm"
                onValueChange={(details) => {
                  const selectedValue = details?.value
                    ? Number(details.value)
                    : 0;
                  const selectedLabel = details?.items
                    ? details.items[0]?.label
                    : '';

                  setSelectedKecamatan(selectedValue);
                  setValue('subdistrict', selectedLabel);
                }}
              >
                <SelectTrigger>
                  <SelectValueText
                    placeholder={
                      kecamatan.length
                        ? 'Pilih Kecamatan'
                        : 'Pilih Kota/kabupaten terlebih dahulu'
                    }
                  />
                </SelectTrigger>
                <SelectContent position="absolute" zIndex={3} w="100%">
                  {kecamatanCollection.items.map((kec) => (
                    <SelectItem item={kec} key={kec.value}>
                      {kec.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field
              label="Kelurahan"
              invalid={!!errors.village}
              errorText={errors.village?.message}
            >
              <SelectRoot
                disabled={!kelurahan.length}
                collection={kelurahanCollection}
                size="sm"
                onValueChange={(details) => {
                  const selectedLabel = details?.items
                    ? details.items[0]?.label
                    : '';
                  setSelectedKelurahan(removeKotaKabupaten(selectedLabel));
                  setValue('village', selectedLabel);
                }}
              >
                <SelectTrigger>
                  <SelectValueText
                    placeholder={
                      kelurahan.length
                        ? 'Pilih Kelurahan terlebih dahulu'
                        : 'Pilih Kecamatan'
                    }
                  />
                </SelectTrigger>
                <SelectContent position="absolute" zIndex={3} w="100%">
                  {kelurahanCollection.items.map((kel) => (
                    <SelectItem item={kel} key={kel.value}>
                      {kel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Field
              label="Kode Pos"
              invalid={!!errors.postal_code}
              errorText={errors.postal_code?.message}
            >
              <SelectRoot
                {...register('postal_code', { valueAsNumber: true })}
                collection={postalCodeCollection}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Masukan Kode Pos" />
                </SelectTrigger>
                <SelectContent>
                  {postalCodeCollection.items.map((pos, index) => (
                    <SelectItem item={pos} key={index}>
                      {pos.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Field>

            <Field
              label="Detail Alamat"
              invalid={!!errors.address}
              errorText={errors.address?.message}
            >
              <Textarea
                {...register('address')}
                padding="10px"
                minHeight="100px"
                border="1px solid gray"
                placeholder="isi dengan jalan, nomor rumah, nomor gedung, lantai atau nomor unit"
              />
            </Field>
            <Field label="Pin Alamat (Pilihan)">
              <Flex
                justify="space-between"
                padding="20px"
                rounded="md"
                border={pinpoint ? '1px solid blue' : '1px solid gray'}
                width="full"
                bgColor={pinpoint ? 'white' : 'gainsboro'}
              >
                <Flex color="gray" alignItems="center" gap="10px">
                  {pinpoint ? (
                    <>
                      <LuMapPin color="blue" />{' '}
                      <Text color="blue">Sudah Pinpoint</Text>
                    </>
                  ) : (
                    <>
                      <LuMapPinOff />
                      Belum Pinpoint
                    </>
                  )}
                </Flex>
                <PopUpLocation />
              </Flex>
            </Field>
          </Flex>
          {/* Metode Pembayaran */}
          <AccordionRoot
            border={isSelected ? '1px solid gray' : '1px solid red'}
            rounded="lg"
            collapsible
            defaultValue={['b']}
            variant="enclosed"
          >
            <AccordionItem bgColor="white" value="a">
              <AccordionItemTrigger
                padding="20px"
                cursor="pointer"
                rounded="0"
                bgColor={isSelected ? 'gray.200' : '#fee2e2'}
              >
                List Product
              </AccordionItemTrigger>
              {products.map((item) => (
                <>
                  <AccordionItemContent
                    display="flex"
                    flexDir="column"
                    fontSize="20px"
                    gap="20px"
                    bgColor="white"
                  >
                    <Flex gap="15px">
                      <Image boxSize="100px" src={productImage} />
                      <Box fontSize="20px" display="flex" flexDir="column">
                        <Text>{item?.variant.name}</Text>
                        <Text color="gray" fontSize="15px">
                          {item?.variant.name} - {item?.quantity} barang ({' '}
                          {item?.variant.weight}
                          g)
                        </Text>
                        <Text fontWeight="medium">{item?.variant.price}</Text>
                      </Box>
                    </Flex>
                  </AccordionItemContent>
                </>
              ))}

              {isSelected && (
                <Box p="30px">
                  <Flex
                    justify="space-between"
                    padding="20px"
                    rounded="md"
                    border={'1px solid blue'}
                    width="full"
                    bgColor={'white'}
                  >
                    <Flex color="gray" alignItems="center" gap="10px">
                      <HStack wrap="wrap" gap="4">
                        <DialogRoot
                          placement="center"
                          motionPreset="slide-in-bottom"
                        >
                          <Button
                            fontSize="14px"
                            fontWeight="medium"
                            color="blue"
                            height="30px"
                            bgColor="white"
                            padding="20px"
                            border="1px solid blue"
                            variant="outline"
                          >
                            {ratesCourier.courier_name}
                          </Button>
                          <Text fontSize="12px" fontWeight="normal" px="10px">
                            {ratesCourier.courier_name}
                          </Text>
                          <Text fontSize="12px" fontWeight="normal" px="10px">
                            {ratesCourier.duration}
                          </Text>
                          <Text
                            fontSize="12px"
                            fontWeight="extrabold"
                            color="black"
                            px="10px"
                          >
                            {formatCurrency(ratesCourier.price)}
                          </Text>
                        </DialogRoot>
                      </HStack>
                    </Flex>
                  </Flex>
                </Box>
              )}

              <AccordionRoot
                borderColor="transparent"
                rounded="lg"
                collapsible
                defaultValue={['b']}
                variant="enclosed"
              >
                <AccordionItem bgColor="white" value="a">
                  <AccordionItemTrigger
                    cursor="pointer"
                    padding="20px"
                    rounded="0"
                  >
                    <Flex width="full" justify="space-between">
                      <Text color="gray">Total</Text>
                      {formatCurrency(totalPrice)}
                    </Flex>
                  </AccordionItemTrigger>
                  <AccordionItemContent
                    display="flex"
                    flexDir="column"
                    padding="20px"
                    rounded="md"
                    fontWeight="light"
                    gap="20px"
                    bgColor="#F9FAFB"
                  >
                    <Box py="20px">
                      <DeliveryMethod onSubmit={onSubmit} rates={rates ?? []} />
                    </Box>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </AccordionItem>
          </AccordionRoot>
        </Box>

        {/* Ringkasan Pembayaran */}
        <Box gap="20px" display="flex" flexDir="column" width="2/6">
          <Flex gap="20px" flexDir="column">
            <Link to="">
              <Flex
                rounded="lg"
                cursor="pointer"
                fontWeight="bold"
                alignItems="center"
                padding="15px"
                gap="10px"
                border="1px solid black"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid blue"
                  rounded="full"
                >
                  <MdOutlineAttachMoney color="blue" />
                </Box>
                <Text>Gunakan / Masukan Voucer</Text>
                <IoIosArrowForward />
              </Flex>
            </Link>

            {/* Total Pembayaran */}
            <Box
              border="1px solid blue"
              bgColor="#E5F2FF"
              rounded="lg"
              display="flex"
              padding="20px"
              flexDir="column"
            >
              <Text fontSize="20px" fontWeight="bold" py="8px">
                Ringkasan Pesanan
              </Text>
              <Table.Root size="sm" unstyled>
                <Table.Header>
                  <Table.Row bgColor="#E5F2FF">
                    <Table.ColumnHeader textAlign="start" color="gray">
                      Total Harga (1)
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="gray" textAlign="end">
                      {formatCurrency(totalPrice)}
                    </Table.ColumnHeader>
                  </Table.Row>
                  <Table.Row bgColor="#E5F2FF">
                    <Table.ColumnHeader py="5px" textAlign="start" color="gray">
                      Biaya Pengiriman
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="gray" textAlign="end">
                      {formatCurrency(cost)}
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row
                    fontSize="20px"
                    fontWeight="bold"
                    bgColor="#E5F2FF"
                    borderTop="1px solid gainsboro"
                    borderBottom="transparent"
                  >
                    <Table.Cell py="5px" color="gray">
                      Total
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      {formatCurrency(totalPrice + cost)}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>
            {/* Catatan */}
            <Box
              border="1px solid blue"
              rounded="lg"
              display="flex"
              gap="20px"
              padding="30px"
              flexDir="column"
            >
              <Flex gap="10px" fontSize="20px" fontWeight="bold">
                Catatan <Text color="gray">(Pilihan)</Text>
              </Flex>
              <Field position="relative" required>
                <Textarea
                  border="1px solid gray"
                  minHeight="100px"
                  padding="10px"
                  placeholder="Tulis catatan / instruksi pesananmu"
                />
                <Text
                  fontSize="12px"
                  position="absolute"
                  right="0"
                  bottom="-20px"
                >
                  0 / 150
                </Text>
              </Field>
            </Box>
          </Flex>
          <form onSubmit={onSubmitCheckout}>
            <Button
              type="submit"
              _active={{ shadow: 'sm' }}
              shadow="md"
              color="white"
              loading={isGettingCheckout}
              bgColor="blue"
            >
              <Text>Pilih Pembayaran</Text>
              <FaArrowRight />
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}
