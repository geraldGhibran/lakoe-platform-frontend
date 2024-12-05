import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Button,
  Input,
  Stack,
  DialogTrigger,
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
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function AddLocation() {
  const ref = useRef<HTMLInputElement>(null);
  const frameworks = createListCollection({
    items: [
      { label: 'React.js', value: 'react' },
      { label: 'Vue.js', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
    ],
  });
  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          bgColor={'white'}
          borderRadius={'100px'}
          color={'black'}
        >
          Tambah Lokasi
        </Button>
      </DialogTrigger>
      <DialogContent position={'fixed'}>
        <DialogHeader>
          <DialogTitle fontWeight={'bold'}>Tambah Lokasi Baru</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Nama Lokasi" required>
              <Input ref={ref} placeholder="Cth.Toko Alamanda" />
            </Field>
            <SelectRoot
              multiple
              collection={frameworks}
              size="sm"
              width="320px"
            >
              <SelectLabel>Select framework</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Movie" />
              </SelectTrigger>
              <SelectContent style={{ position: 'absolute', zIndex: 10 }}>
                {frameworks.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Field label="Judul Pesan" required>
              <Input ref={ref} placeholder="Judul Pesan" />
            </Field>
            <Field label="Judul Pesan" required>
              <Input ref={ref} placeholder="Judul Pesan" />
            </Field>
          </Stack>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              bgColor={'white'}
              borderRadius={'100px'}
              color={'black'}
            >
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button
            variant="outline"
            bgColor={'#0086B4'}
            borderRadius={'100px'}
            color={'white'}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
