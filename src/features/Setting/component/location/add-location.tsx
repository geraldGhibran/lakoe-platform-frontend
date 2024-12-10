import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Stack,
  DialogTrigger,
  Textarea,
  Text,
} from '@chakra-ui/react';
import { createListCollection } from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Field } from '@/components/ui/field';
import { useRef } from 'react';
import { DialogRoot } from '@/components/ui/dialog';
import LocationConfig from './location-config';
import { useAddLocation } from '../../hooks/useAddLocation';

const AddLocation = () => {
  const { provinsi, kabupaten, postalCodes, setSelectedProvinsi } =
    useAddLocation();

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
      value: kab.id,
    })),
  });

  const postalCodeCollection = createListCollection({
    items: postalCodes.map((pos) => ({
      label: pos.regency,
      value: pos.code,
    })),
  });
  console.log('Postal Codes Collection:', postalCodeCollection.items);

  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          bgColor="white"
          borderRadius="100px"
          color="black"
        >
          Tambah Lokasi
        </Button>
      </DialogTrigger>
      <DialogContent position="fixed" zIndex={1} top="-7%">
        <DialogHeader>
          <DialogTitle fontWeight="bold">Tambah Lokasi Baru</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Nama Lokasi" required>
              <Input ref={ref} placeholder="Cth. Toko Alamanda" />
            </Field>
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
              onValueChange={(details) => console.log(details.value)}
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
            </SelectRoot>
            <SelectRoot collection={postalCodeCollection}>
              <SelectLabel>Kode Pos</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Masukan Kode Pos" />
              </SelectTrigger>
              <SelectContent>
                {postalCodeCollection.items.map((pos) => (
                  <SelectItem item={pos} key={pos.label}>
                    {pos.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Field label="Alamat Lengkap" required>
              <Textarea placeholder="Masukan Deskripsi Lokasi" />
            </Field>
            <Text fontWeight={'500'}>Pinpoint Lokasi</Text>
            <Text color={'#909090'} mt={'-15px'}>
              Tandai lokasi untuk mempermudah permintaan pickup kurir
            </Text>
            <LocationConfig onLocationChange={() => {}} />
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              bgColor="blue"
              borderRadius="100px"
              color="white"
              type="submit"
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
      </DialogContent>
    </DialogRoot>
  );
};

export default AddLocation;
