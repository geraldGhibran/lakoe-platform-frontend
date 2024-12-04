import { Field } from '@/components/ui/field';
import { productSchema } from '@/features/product/components/schemas/addProductSchema';
import { Box, Button, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

export default function CheckoutForm() {
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

  return (
    <Stack direction="row">
      <Box minH="270vh" w="100%" p={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            px={10}
            py={5}
            m="auto"
            width="100%"
            h={'280px'}
            bg="white"
            my={5}
            boxShadow="md"
            borderRadius="lg"
          >
            <Text fontSize="2xl" mt={10} fontWeight="bold">
              Informasi Kontak
            </Text>
            <Box pt={5}>
              <Field label="Email">
                <Input
                  placeholder="email"
                  value={'gerald.gunasha@gmail.com'}
                  {...register('productName')}
                  borderColor={errors.productName ? 'red.500' : 'gray.200'}
                />
              </Field>
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
              Alamat Pengiriman
            </Text>
            <Box pt={5}>
              <Field label="Deskripsi" helperText="Max 3000 characters.">
                <Textarea
                  placeholder="Masukan deskripsi Alamat Pengiriman kamu"
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
