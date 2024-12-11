import { useAuthStore } from '@/store/auth';
import { Box, Button, Stack, Tabs, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ListProduct from './listProduct';
import NotFoundCard from './notFound';
import Header from './CardProduct/header';

function ProductList() {
  const navigate = useNavigate();
  const isFound = true;
  const { user } = useAuthStore();
  console.log('user', user);

  return (
    <Stack direction={'row'} bg={'#F4F4F5'} height={'100vh'}>
      <Box
        bg={'white'}
        p={5}
        mx={'auto'}
        rounded={'md'}
        width={'100%'}
        display="flex"
        flexDirection="column"
      >
        <Box
          position="sticky"
          top="0"
          bg="white"
          zIndex="10"
          borderBottom="1px solid #E6E6E6"
          py={4}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text fontWeight={'bold'} fontSize={'2xl'}>
              Daftar Produk
            </Text>
            <Button
              rounded={'full'}
              onClick={() => navigate('/add-product')}
              bgColor={'blue.500'}
            >
              <Icon icon={'icons8:plus'} />
              <Text ml={2}>Tambah Produk</Text>
            </Button>
          </Box>
        </Box>
        <Box flex="1" overflowY="auto" pt={4}>
          <Tabs.Root defaultValue={'all'}>
            <Tabs.List
              position="sticky"
              top="-20px"
              bg="white"
              zIndex="90"
              borderBottom="1px solid #E6E6E6"
              py={2}
            >
              <Tabs.Trigger value="all">
                <Text>Semua</Text>
              </Tabs.Trigger>
              <Tabs.Trigger value="active">
                <Text>Aktif</Text>
              </Tabs.Trigger>
              <Tabs.Trigger value="nonactive">
                <Text>Nonaktif</Text>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="all">
              <Box
                position="sticky"
                top="60px"
                zIndex="9"
                borderBottom="1px solid #E6E6E6"
                py={2}
              >
                <Header />
              </Box>
              {isFound ? (
                <>
                  <ListProduct />
                  <ListProduct />
                  <ListProduct />
                  <ListProduct />
                  <ListProduct />
                  <ListProduct />
                  <ListProduct />
                </>
              ) : (
                <NotFoundCard>
                  <Text>Oops, produk yang kamu cari tidak ditemukan</Text>
                  <Text color={'fg.muted'} fontSize={'sm'}>
                    Coba kata kunci lain atau tambahkan produk baru
                  </Text>
                </NotFoundCard>
              )}
            </Tabs.Content>

            <Tabs.Content value="active">
              <Box
                position="sticky"
                top="60px"
                bg="white"
                zIndex="9"
                borderBottom="1px solid #E6E6E6"
                py={2}
              >
                <Header />
              </Box>
              {isFound ? (
                <ListProduct />
              ) : (
                <NotFoundCard>
                  <Text>Oops, saat ini belum ada produk yang aktif</Text>
                  <Text color={'fg.muted'} fontSize={'sm'}>
                    Aktifkan produk kamu atau buat produk baru
                  </Text>
                </NotFoundCard>
              )}
            </Tabs.Content>

            <Tabs.Content value="nonactive">
              <Box
                position="sticky"
                top="60px"
                bg="white"
                zIndex="9"
                borderBottom="1px solid #E6E6E6"
                py={2}
              >
                <Header />
              </Box>
              {isFound ? (
                <ListProduct />
              ) : (
                <NotFoundCard>
                  <Text>Semua produk telah aktif</Text>
                  <Text color={'fg.muted'} fontSize={'sm'}>
                    Kamu bisa buat produk baru dan menyimpannya
                  </Text>
                </NotFoundCard>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Stack>
  );
}

export default ProductList;
