import {
  Box,
  Input,
  Text,
  Stack,
  Group,
  InputAddon,
  Textarea,
  Button,
  HStack,
} from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { Field } from '@/components/ui/field';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '@/components/ui/file-upload';
import { Icon } from '@iconify/react';

export default function AddProductPage() {
  return (
    <Box bg="gray.100" minH="270vh" w="100%" pt={1}>
      <Box
        px={10}
        py={5}
        m="auto"
        width="70%"
        bg="white"
        my={5}
        boxShadow="md"
        borderRadius="lg"
      >
        <Text fontSize="2xl" mt={10} fontWeight="bold">
          Informasi Produk
        </Text>
        <Box pt={5}>
          <Field label="Nama produk">
            <Input placeholder="masukan nama produk" />
          </Field>
        </Box>
        <Box pt={5}>
          <Stack>
            <Text fontSize="14px" fontWeight="500">
              URL Halaman Checkout
            </Text>
            <Group attached>
              <InputAddon>lakoe.store/</InputAddon>
              <Input placeholder="nama produk" />
            </Group>
          </Stack>
        </Box>
        <Box pt={5}>
          <Field label="Kategori">
            <NativeSelectRoot>
              <NativeSelectField
                name="country"
                items={[
                  'Pilih kategori produk',
                  'Canada (CA)',
                  'United States (US)',
                ]}
              />
            </NativeSelectRoot>
          </Field>
        </Box>
      </Box>
      <Box
        px={10}
        py={5}
        m="auto"
        width="70%"
        bg="white"
        my={5}
        boxShadow="md"
        borderRadius="lg"
      >
        <Text fontSize="2xl" mt={10} fontWeight="bold">
          Detail Produk
        </Text>
        <Box pt={5}>
          <Field label="Deskripsi" helperText="Max 3000 characters.">
            <Textarea
              placeholder="Masukan deskripsi lengkap produk kamu"
              variant="outline"
              h={'200px'}
            />
          </Field>
        </Box>
        <Box pt={5}>
          <Text fontSize="14px" fontWeight="500" pb={1}>
            Foto Produk
          </Text>
          <Stack direction="row">
            <FileUploadRoot maxW="25%" alignItems="stretch">
              <FileUploadDropzone
                description="Foto Utama"
                label={undefined}
                minH={'200px'}
              />
              <FileUploadList />
            </FileUploadRoot>
            <FileUploadRoot maxW="25%" alignItems="stretch">
              <FileUploadDropzone
                description="Foto 2"
                label={undefined}
                minH={'200px'}
              />
              <FileUploadList />
            </FileUploadRoot>
            <FileUploadRoot maxW="25%" alignItems="stretch">
              <FileUploadDropzone
                description="Foto 3"
                label={undefined}
                minH={'200px'}
              />
              <FileUploadList />
            </FileUploadRoot>
            <FileUploadRoot maxW="25%" alignItems="stretch">
              <FileUploadDropzone
                description="Foto 4"
                label={undefined}
                minH={'200px'}
              />
              <FileUploadList />
            </FileUploadRoot>
            <FileUploadRoot maxW="25%" alignItems="stretch">
              <FileUploadDropzone
                description="Foto 5"
                label={undefined}
                minH={'200px'}
              />
              <FileUploadList />
            </FileUploadRoot>
          </Stack>
        </Box>
      </Box>
      <Box
        px={10}
        py={1}
        mb={5}
        m="auto"
        height="150px"
        width="70%"
        bg="white"
        boxShadow="md"
        borderRadius="lg"
      >
        <Stack direction="row" justifyContent={'space-between'}>
          <Box>
            <Text fontSize="2xl" mt={10} fontWeight="bold">
              Varian Produk
            </Text>
            <Text fontSize="14px">
              Tambah varian agar pembeli dapat memilih produk sesuai,yuk!
            </Text>
          </Box>
          <Box mt={10}>
            <Button
              type="submit"
              bg={'white'}
              color={'black'}
              border={'1px solid black'}
              borderRadius={'100px'}
            >
              <Icon icon="formkit:add" /> Tambah Varian{' '}
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box
        px={10}
        py={1}
        m="auto"
        width="70%"
        h={300}
        bg="white"
        my={5}
        boxShadow="md"
        borderRadius="lg"
      >
        <Text fontSize="2xl" mt={10} mb={5} fontWeight="bold">
          Harga
        </Text>
        <Text fontSize="14px" mb={2} fontWeight="500">
          Harga
        </Text>
        <Stack>
          <Group attached>
            <InputAddon>Rp</InputAddon>
            <Input placeholder="Masukan harga satuan barang" />
          </Group>
          <Text fontSize="14px" mb={1} mt={2} fontWeight="500">
            Minimal Pembelian
          </Text>
          <Group attached>
            <Input value={'1'} />
            <InputAddon>Produk</InputAddon>
          </Group>
        </Stack>
      </Box>
      <Box
        px={10}
        py={1}
        m="auto"
        width="70%"
        h={200}
        bg="white"
        my={5}
        boxShadow="md"
        borderRadius="lg"
      >
        <Text fontSize="2xl" mt={10} mb={5} fontWeight="bold">
          Pengelolaan Produk
        </Text>
        <HStack gap="10" width="full">
          <Field label="Stock Produk">
            <Input placeholder="Masukan Jumlah stok" variant="outline" />
          </Field>
          <Field label="SKU(Stock Keeping Unit)">
            <Input placeholder="Masukan SKU" variant="outline" />
          </Field>
        </HStack>
      </Box>
      <Box
        px={10}
        py={1}
        m="auto"
        width="70%"
        h={300}
        bg="white"
        my={5}
        boxShadow="md"
        borderRadius="lg"
      >
        <Text fontSize="2xl" mt={10} mb={5} fontWeight="bold">
          Berat & Pengiriman
        </Text>
        <Stack>
          <Text fontSize="14px" mb={1} mt={2} fontWeight="500">
            Berat Produk
          </Text>
          <Group attached>
            <Input placeholder="Masukan berat produk" />
            <InputAddon>Gram</InputAddon>
          </Group>
        </Stack>
        <HStack gap="20" width="100%" mt={5}>
          <Box>
            <Text fontSize="14px" mb={1} mt={2} fontWeight="500">
              Ukuran Produk
            </Text>
            <Group attached w={'312px'}>
              <Input placeholder="panjang" />
              <InputAddon>cm</InputAddon>
            </Group>
          </Box>
          <Box>
            <Group attached w={'312px'} mt={8}>
              <Input placeholder="Lebar" />
              <InputAddon>cm</InputAddon>
            </Group>
          </Box>
          <Box>
            <Group attached w={'312px'} mt={8}>
              <Input placeholder="Tinggi" />
              <InputAddon>cm</InputAddon>
            </Group>
          </Box>
        </HStack>
      </Box>
      <Box
        p={10}
        m="auto"
        width="70%"
        bg="white"
        my={5}
        boxShadow="md"
        borderRadius="lg"
      >
        <Stack direction="row" justifyContent={'space-between'} width="100%">
          <Box>
            <Button
              type="submit"
              bg={'white'}
              color={'black'}
              border={'1px solid gray'}
              borderRadius={'100px'}
            >
              Preview Halaman Checkout
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              width={'100px'}
              bg={'white'}
              color={'black'}
              border={'1px solid gray'}
              borderRadius={'100px'}
            >
              Batal
            </Button>
            <Button
              ml={1}
              type="submit"
              width={'100px'}
              bg={'#0086B4'}
              color={'white'}
              border={'1px solid gray'}
              borderRadius={'100px'}
            >
              Simpan
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
