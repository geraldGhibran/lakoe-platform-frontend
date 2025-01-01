import { Button } from '@/components/ui/button';
import { DialogActionTrigger, DialogRoot } from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Box,
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
} from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useAddLocation } from '../../hooks/useAddLocation';

const AddLocation = () => {
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
    isAddingLocationStore,
    register,
    onSubmit,
    watch,
    setValue,
    isOpen,
    setIsOpen,
    onMarkerDragEnd,
    address,
    position,
    markerRef,
  } = useAddLocation();

  const ref = useRef<HTMLInputElement>(null);

  const provinsiCollection = createListCollection({
    items: provinsi.map((prov) => ({
      label: prov.name,
      value: prov.id,
    })),
  });

  const kabupatenCollection = createListCollection({
    items: kabupaten.map((kab) => ({
      label: kab.name,
      value: Number(kab.id),
    })),
  });

  const kecamatanCollection = createListCollection({
    items: kecamatan.map((kab) => ({
      label: kab.name,
      value: kab.id,
    })),
  });

  const kelurahanCollection = createListCollection({
    items: kelurahan.map((kab) => ({
      label: kab.name,
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
    <DialogRoot
      open={isOpen}
      lazyMount
      initialFocusEl={() => ref.current}
      size="lg"
      scrollBehavior="outside"
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          bgColor="white"
          borderRadius="100px"
          color="black"
          onClick={() => setIsOpen(!isOpen)}
        >
          Tambah Lokasi
        </Button>
      </DialogTrigger>
      <DialogContent position="absolute" zIndex={1} top="-5%" left="15%">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle fontWeight="bold">Tambah Lokasi Baru</DialogTitle>
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
              <Input
                {...register('user_id')}
                border="2px solid black"
                placeholder="ID"
                type="number"
                hidden
              />

              <Field
                label="Nama Lokasi"
                invalid={!!errors.name}
                errorText={errors.name?.message}
              >
                <Input placeholder="Cth. Toko Alamanda" {...register('name')} />
              </Field>
              <Field
                label="Provinsi"
                invalid={!!errors.province_code || !!errors.province}
                errorText={
                  errors.province_code?.message || errors.province?.message
                }
              >
                <SelectRoot
                  collection={provinsiCollection}
                  size="sm"
                  disabled={!provinsi.length}
                  {...register('province_code', { valueAsNumber: true })}
                  onValueChange={(details) => {
                    const selectedValue = details?.value
                      ? Number(details.value)
                      : 0;
                    const selectedLabel = details?.items
                      ? details.items[0]?.label
                      : '';

                    setSelectedProvinsi(selectedValue);
                    setValue('province_code', selectedValue);
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
                invalid={!!errors.city_district || !!errors.city_district_code}
                errorText={
                  errors.city_district?.message ||
                  errors.city_district_code?.message
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
                    setValue('city_district_code', selectedValue);
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
                invalid={!!errors.subdistrict || !!errors.subdistrict_code}
                errorText={
                  errors.subdistrict?.message ||
                  errors.subdistrict_code?.message
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
                    setValue('subdistrict_code', selectedValue);
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
                label="Alamat Lengkap"
                invalid={!!errors.address}
                errorText={errors.address?.message}
              >
                <Textarea
                  {...register('address')}
                  placeholder="Masukan Deskripsi Lokasi"
                />
              </Field>

              <Text fontWeight={'500'}>Pinpoint Lokasi</Text>
              <Text color={'#909090'} mt={'-15px'}>
                Tandai lokasi untuk mempermudah permintaan pickup kurir
              </Text>
              {/* <DraggableMarkerMap /> */}

              <Box width="100%" height="20vh" position="relative">
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={position}
                    draggable={true}
                    eventHandlers={{ dragend: onMarkerDragEnd }}
                    ref={markerRef}
                  >
                    <Popup>
                      <div>
                        Latitude: {position.lat.toFixed(4)}, Longitude:{' '}
                        {position.lng.toFixed(4)}
                        <br />
                        Address: {address}
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </Box>
              <Field label="Jadikan Alamat Utama">
                <Switch
                  colorPalette="blue"
                  checked={watch('is_main_location')}
                  onChange={(e) =>
                    setValue(
                      'is_main_location',
                      (e.target as HTMLInputElement).checked
                    )
                  }
                />
                {errors.is_main_location && (
                  <Text color="red.500">This field is required</Text>
                )}
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Button
              loading={isAddingLocationStore}
              variant="outline"
              bgColor="blue"
              borderRadius="100px"
              color="white"
              type="submit"
            >
              Simpan
            </Button>
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
                bgColor="white"
                borderRadius="100px"
                color="black"
                onClick={() => setIsOpen(!isOpen)}
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

export default AddLocation;
