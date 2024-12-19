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
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '@/components/ui/file-upload';
import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../schemas/addProductSchema/index';
import { useState } from 'react';
import VariantComponent from './variant';

interface ProductFormData {
  productName: string;
  checkoutUrl: string;
  category: string;
  description: string;
  price: number;
  minPurchase: number;
  stock: number;
  sku: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  image: File[];
}

export default function AddProductPage() {
  const onSubmit = (data: ProductFormData) => {
    console.log('Form data:', data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });
  const [isVariantTypeCreate, setIsVariantTypeCreate] = useState(false);

  const [colorTags, setColorTags] = useState<string[]>([]);
  const [sizeTags, setSizeTags] = useState<string[]>([]);

  const handleAddColorTag = (tag: string) => {
    setColorTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveColorTag = (index: number) => {
    setColorTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleAddSizeTag = (tag: string) => {
    setSizeTags((prevTags) => [...prevTags, tag]);
  };

  const handleRemoveSizeTag = (index: number) => {
    setSizeTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleVariantTypeCreateToggle = () => {
    setIsVariantTypeCreate(!isVariantTypeCreate);
  };
  return (
    <Stack direction="row">
      <Box bg="gray.100" minH="270vh" w="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            px={10}
            py={2}
            m="auto"
            width="100%"
            h={'480px'}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
          >
            <Text fontSize="2xl" mt={10} fontWeight="bold">
              Informasi Produk
            </Text>
            <Box pt={5}>
              <Field label="Nama produk">
                <Input
                  placeholder="masukan nama produk"
                  {...register('productName')}
                  borderColor={errors.productName ? 'red.500' : 'gray.200'}
                />
              </Field>
              {errors.productName && (
                <Text color={'red.500'}>
                  {errors.productName.message as string}
                </Text>
              )}
            </Box>
            <Box pt={5}>
              <Stack>
                <Text fontSize="14px" fontWeight="500">
                  URL Halaman Checkout
                </Text>
                <Group attached>
                  <InputAddon>lakoe.store/</InputAddon>
                  <Input
                    placeholder="nama produk"
                    {...register('checkoutUrl')}
                    borderColor={errors.checkoutUrl ? 'red.500' : 'gray.200'}
                  />
                </Group>
                {errors.checkoutUrl && (
                  <Text color={'red.500'}>
                    {errors.checkoutUrl.message as string}
                  </Text>
                )}
              </Stack>
            </Box>
            <Box pt={5}>
              <Field label="Kategori">
                <NativeSelectRoot>
                  <NativeSelectField
                    items={[
                      'Pilih kategori produk',
                      'Canada (CA)',
                      'United States (US)',
                    ]}
                    {...register('category')}
                    borderColor={errors.productName ? 'red.500' : 'gray.200'}
                  />
                </NativeSelectRoot>
              </Field>
              {errors.category && (
                <Text color={'red.500'}>
                  {errors.category.message as string}
                </Text>
              )}
            </Box>
          </Box>
          <Box
            px={10}
            py={5}
            m="auto"
            width="100%"
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
                  {...register('description')}
                  borderColor={errors.description ? 'red.500' : 'gray.200'}
                />
              </Field>
              {errors.description && (
                <Text color={'red.500'}>
                  {errors.description.message as string}
                </Text>
              )}
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
              {errors.image && (
                <Text color={'red.500'}>{'Foto Produk wajib diisi'}</Text>
              )}
            </Box>
          </Box>
          <Box
            px={10}
            py={5}
            mb={5}
            m="auto"
            width="100%"
            bg="white"
            boxShadow="md"
            borderRadius="lg"
          >
            <VariantComponent
              colorTags={colorTags}
              sizeTags={sizeTags}
              onAddColorTag={handleAddColorTag}
              onRemoveColorTag={handleRemoveColorTag}
              onAddSizeTag={handleAddSizeTag}
              onRemoveSizeTag={handleRemoveSizeTag}
              onToggleVariantTypeCreate={handleVariantTypeCreateToggle}
              isVariantTypeCreate={isVariantTypeCreate}
            />
          </Box>
          <Box
            px={10}
            py={1}
            m="auto"
            width="100%"
            h={350}
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
                <Input
                  placeholder="Masukan harga satuan barang"
                  {...register('price')}
                  borderColor={errors.price ? 'red.500' : 'gray.200'}
                />
              </Group>
              {errors.price && (
                <Text color={'red.500'}>{errors.price.message as string}</Text>
              )}
              <Text fontSize="14px" mb={1} mt={2} fontWeight="500">
                Minimal Pembelian
              </Text>
              <Group attached>
                <Input
                  value={'1'}
                  {...register('minPurchase')}
                  borderColor={errors.minPurchase ? 'red.500' : 'gray.200'}
                />
                <InputAddon>Produk</InputAddon>
              </Group>
              {errors.minPurchase && (
                <Text color={'red.500'}>
                  {errors.minPurchase.message as string}
                </Text>
              )}
            </Stack>
          </Box>
          <Box
            px={10}
            py={1}
            m="auto"
            width="100%"
            h={220}
            bg="white"
            my={5}
            boxShadow="md"
            borderRadius="lg"
          >
            <Text fontSize="2xl" mt={10} mb={5} fontWeight="bold">
              Pengelolaan Produk
            </Text>
            <HStack gap="10" width="full">
              <Box>
                <Field label="Stock Produk">
                  <Input
                    placeholder="Masukan Jumlah stok"
                    variant="outline"
                    {...register('stock')}
                    borderColor={errors.stock ? 'red.500' : 'gray.200'}
                    width="350px"
                  />
                </Field>
                {errors.stock && (
                  <Text color={'red.500'}>
                    {errors.stock.message as string}
                  </Text>
                )}
              </Box>
              <Box>
                <Field label="SKU(Stock Keeping Unit)">
                  <Input
                    placeholder="Masukan SKU"
                    variant="outline"
                    {...register('sku')}
                    borderColor={errors.sku ? 'red.500' : 'gray.200'}
                    width="350px"
                  />
                </Field>
                {errors.sku && (
                  <Text color={'red.500'}>{errors.sku.message as string}</Text>
                )}
              </Box>
            </HStack>
          </Box>
          <Box
            px={10}
            py={1}
            m="auto"
            width="100%"
            h={350}
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
                <Input
                  placeholder="Masukan berat produk"
                  {...register('weight')}
                  borderColor={errors.weight ? 'red.500' : 'gray.200'}
                />
                <InputAddon>Gram</InputAddon>
              </Group>
              {errors.weight && (
                <Text color={'red.500'}>{errors.weight.message as string}</Text>
              )}
            </Stack>
            <HStack gap="20" width="100%" mt={5}>
              <Box>
                <Text fontSize="14px" mb={1} mt={2} fontWeight="500">
                  Ukuran Produk
                </Text>
                <Group attached w={'120%'}>
                  <Input
                    placeholder="panjang"
                    {...register('length')}
                    borderColor={errors.length ? 'red.500' : 'gray.200'}
                  />
                  <InputAddon>cm</InputAddon>
                </Group>
                {errors.length && (
                  <Text color={'red.500'}>
                    {errors.length.message as string}
                  </Text>
                )}
              </Box>
              <Box>
                <Group attached w={'120%'} mt={8}>
                  <Input placeholder="Lebar" {...register('width')} />
                  borderColor={errors.width ? 'red.500' : 'gray.200'}
                  <InputAddon>cm</InputAddon>
                </Group>
                {errors.width && (
                  <Text color={'red.500'}>
                    {errors.width.message as string}
                  </Text>
                )}
              </Box>
              <Box>
                <Group attached w={'120%'} mt={8}>
                  <Input
                    placeholder="Tinggi"
                    {...register('height')}
                    borderColor={errors.height ? 'red.500' : 'gray.200'}
                  />
                  <InputAddon>cm</InputAddon>
                </Group>
                {errors.height && (
                  <Text color={'red.500'}>
                    {errors.height.message as string}
                  </Text>
                )}
              </Box>
            </HStack>
          </Box>
          <Box
            p={10}
            m="auto"
            width="100%"
            bg="white"
            my={5}
            boxShadow="md"
            borderRadius="lg"
          >
            <Stack
              direction="row"
              justifyContent={'space-between'}
              width="100%"
            >
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
        </form>
      </Box>
    </Stack>
  );
}
