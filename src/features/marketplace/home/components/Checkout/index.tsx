import {
  Box,
  Button,
  Fieldset,
  Flex,
  Group,
  Image,
  Input,
  InputAddon,
  Table,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Field } from '@/components/ui/field';
import { Link } from 'react-router-dom';
import { LuMapPinOff } from 'react-icons/lu';
import PopUpLocation from './popUpLocation';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa6';
import { formatCurrency } from '@/features/add-other/format-currency';
import { useCartStore } from '@/store/cart-store';
import DeliveryMethod from '../Form/deliveryMethod';
import { useGetRates } from '../../hooks/useGetRates';

export default function Checkout() {
  const { totalPrice, products } = useCartStore();
  const { onSubmit, rates } = useGetRates();

  const ratesData = {
    pricing: {
      pricing: rates.length > 0 ? rates : [],
    },
  };

  <Box padding="10px 100px" pb="100px">
    <Text fontSize="30px" fontWeight="medium" mb="20px">
      Checkout
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
            <Text color="blue">Langkah 1</Text>
            <Text fontWeight="medium">Info Pengiriman</Text>
          </Box>
          <Box
            display="flex"
            padding="10px 20px"
            color="gray"
            flexDir="column"
            justifyContent="start"
            alignItems="start"
          >
            <Text>Langkah 2</Text>
            <Text fontWeight="medium">Metode Pembayaran</Text>
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
            Alamat Pengiriman asdasdasd
          </Text>
          <Fieldset.Root width="full">
            <Field label="Nama Penerima">
              <Input px="20px" border="1px solid gray" name="name" />
            </Field>

            <Field label="Nomor HP">
              <Group width="full" border="1px solid gray" rounded="md" attached>
                <InputAddon bgColor="gainsboro">+62</InputAddon>
                <Input px="20px" placeholder="Phone number..." />
              </Group>
            </Field>
          </Fieldset.Root>
          <Field label="Kecamatan">
            <NativeSelectRoot size="md" width="full">
              <NativeSelectField>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="svelte">Svelte</option>
                <option value="angular">Angular</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>

          <Field label="Kelurahan">
            <NativeSelectRoot size="md" width="full">
              <NativeSelectField>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="svelte">Svelte</option>
                <option value="angular">Angular</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>

          <Field label="Detail Alamat" required>
            <Textarea
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
              border="1px solid gray"
              width="full"
              bgColor="gainsboro"
            >
              <Flex color="gray" alignItems="center" gap="10px">
                <LuMapPinOff />
                Belum Pinpoint
              </Flex>
              <PopUpLocation />
            </Flex>
          </Field>
        </Flex>
        {/* Metode Pembayaran */}
        <AccordionRoot
          border="1px solid red"
          rounded="lg"
          collapsible
          defaultValue={['b']}
          variant="enclosed"
        >
          {products.map((item) => (
            <AccordionItem bgColor="white" value="a">
              <AccordionItemTrigger
                padding="20px"
                cursor="pointer"
                rounded="0"
                bgColor="#fee2e2"
              >
                {item?.product?.title}
              </AccordionItemTrigger>
              <AccordionItemContent
                display="flex"
                flexDir="column"
                fontSize="20px"
                gap="20px"
                bgColor="white"
              >
                {/* <Text>Depok</Text> */}
                <Flex gap="15px">
                  <Image boxSize="100px" src={item?.product?.image} />
                  <Box fontSize="20px" display="flex" flexDir="column">
                    <Text>{item?.product?.title}</Text>
                    <Text color="gray" fontSize="15px">
                      {item?.product?.category} - {item?.quantity} barang (100
                      g)
                    </Text>
                    <Text fontWeight="medium">
                      {formatCurrency(totalPrice)}
                    </Text>
                  </Box>
                </Flex>
                <Box borderY="1px solid gainsboro" py="20px">
                  <DeliveryMethod onSubmit={onSubmit} rates={ratesData} />
                </Box>

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
                      <Flex
                        fontSize="15px"
                        width="full"
                        justify="space-between"
                      >
                        <Text>Total (items)</Text>
                        {formatCurrency(totalPrice)}
                      </Flex>
                    </AccordionItemContent>
                  </AccordionItem>
                </AccordionRoot>
              </AccordionItemContent>
            </AccordionItem>
          ))}
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
                    {formatCurrency(567)}
                  </Table.ColumnHeader>
                </Table.Row>
                <Table.Row bgColor="#E5F2FF">
                  <Table.ColumnHeader py="5px" textAlign="start" color="gray">
                    Biaya Pengiriman
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="gray" textAlign="end">
                    {formatCurrency(0)}
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
                  <Table.Cell textAlign="end">{formatCurrency(567)}</Table.Cell>
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
        <Button
          type="submit"
          _active={{ shadow: 'sm' }}
          shadow="md"
          color="white"
          bgColor="blue"
        >
          <Text>Pilih Pembayaran</Text>
          <FaArrowRight />
        </Button>
      </Box>
    </Flex>
  </Box>;
}
