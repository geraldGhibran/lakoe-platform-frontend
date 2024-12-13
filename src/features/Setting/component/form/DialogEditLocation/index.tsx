import DraggableMarkerMap from '@/components/DraggableMarkerMap;';
import { Button } from '@/components/ui/button';
import { DialogActionTrigger, DialogRoot } from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { useLocationStore } from '@/store/location';
import {
  createListCollection,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useEditLocation } from '@/features/Setting/hooks/useEditLocation';
import { useAddLocation } from '@/features/Setting/hooks/useAddLocation';
import { Icon } from '@iconify/react/dist/iconify.js';

const DialogEditLocation = ({ id }: { id: number }) => {
  const { errors, isEditingLocationStore, register, onSubmit, locationStore } =
    useEditLocation(id);

  const {
    provinsi,
    kabupaten,
    postalCodes,
    setSelectedProvinsi,
    setSelectedKabupaten,
    removeKotaKabupaten,
  } = useAddLocation();

  const ref = useRef<HTMLInputElement>(null);

  const provinsiCollection = createListCollection({
    items: provinsi.map((prov) => ({
      label: prov.nama,
      value: prov.id,
    })),
  });

  const kabupatenCollection = createListCollection({
    items: kabupaten.map((kab) => ({
      label: kab.nama,
      value: kab.nama,
    })),
  });

  const postalCodeCollection = createListCollection({
    items: postalCodes.map((pos) => ({
      label: pos.code,
      value: Number(pos.code),
    })),
  });
  const { onClose } = useDisclosure();

  const { position } = useLocationStore();

  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Icon icon="bx:edit" />
      </DialogTrigger>
      <DialogContent position="fixed" zIndex={1} top="-7%">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle fontWeight="bold">Edit Lokasi</DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Input
                {...register('latitude')}
                border="2px solid black"
                value={position.lat}
                type="number"
                hidden
              />
              <Input
                {...register('longitude')}
                border="2px solid black"
                value={position.lng}
                type="number"
                hidden
              />
              <Input
                {...register('store_id')}
                border="2px solid black"
                placeholder="ID"
                type="number"
                hidden
              />
              <Field label="Nama Lokasi">
                <Input placeholder="Cth. Toko Alamanda" {...register('name')} />
              </Field>
              {errors.name && (
                <Text color={'red.500'}>{errors.name.message as string}</Text>
              )}
              <SelectRoot
                collection={provinsiCollection}
                size="sm"
                onValueChange={(details) =>
                  setSelectedProvinsi(
                    details.value ? Number(details.value) : null
                  )
                }
              >
                <SelectLabel>Provinsi</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Pilih Provinsi" />
                </SelectTrigger>
                <SelectContent position="absolute" zIndex={3} w="100%">
                  {provinsiCollection.items.map((prov) => (
                    <SelectItem item={prov} key={prov.value}>
                      {prov.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              <SelectRoot
                collection={kabupatenCollection}
                size="sm"
                disabled={!kabupaten.length}
                {...register('city_district')}
                onValueChange={(details) =>
                  setSelectedKabupaten(
                    details.value ? removeKotaKabupaten(details.value[0]) : null
                  )
                }
              >
                <SelectLabel>Kabupaten/Kota</SelectLabel>
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
                {errors.city_district && (
                  <Text color={'red.500'}>
                    {errors.city_district.message as string}
                  </Text>
                )}
              </SelectRoot>
              <SelectRoot
                defaultValue={[locationStore?.postal_code]}
                {...register('postal_code', { valueAsNumber: true })}
                collection={postalCodeCollection}
              >
                <SelectLabel>Kode Pos</SelectLabel>
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
                {errors.postal_code && (
                  <Text color={'red.500'}>{errors.postal_code.message}</Text>
                )}
              </SelectRoot>
              <Field label="Alamat Lengkap">
                <Textarea
                  {...register('address')}
                  placeholder="Masukan Deskripsi Lokasi"
                />
                {errors.address && (
                  <Text color={'red.500'}>{errors.address.message}</Text>
                )}
              </Field>

              <Text fontWeight={'500'}>Pinpoint Lokasi</Text>
              <Text color={'#909090'} mt={'-15px'}>
                Tandai lokasi untuk mempermudah permintaan pickup kurir
              </Text>
              {/* <LocationConfig onLocationChange={(detail) => console.log(detail)} /> */}
              <DraggableMarkerMap />
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button
                loading={isEditingLocationStore}
                variant="outline"
                bgColor="blue"
                borderRadius="100px"
                color="white"
                type="submit"
                onClick={isEditingLocationStore ? () => {} : () => onClose()}
              >
                Simpan
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
                bgColor="white"
                borderRadius="100px"
                color="black"
              >
                Batalkan
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogEditLocation;
