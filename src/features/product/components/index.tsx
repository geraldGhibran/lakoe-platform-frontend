import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup } from '@/components/ui/input-group';
import { useAuthStore } from '@/store/auth';
import {
  Box,
  Button,
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ListProduct from './listProduct';
import NotFoundCard from './notFound';

function ProductList() {
  const navigate = useNavigate();
  const isFound = true;
  const categoryCollectionDummy = createListCollection({
    items: [
      { label: 'semua kategory', value: 'all' },
      { label: 'baju', value: 'baju' },
      { label: 'celana', value: 'celana' },
      { label: 'sepatu', value: 'sepatu' },
    ],
  });
  const sortCollectionDummy = createListCollection({
    items: [
      { label: 'terbaru', value: 'terbaru' },
      { label: 'terlama', value: 'terlama' },
      { label: 'termahal', value: 'termahal' },
      { label: 'termurah', value: 'termurah' },
    ],
  });

  const { user } = useAuthStore();
  console.log('user', user);
  return (
    <>
      <Stack direction={'row'} gap={5} bg={'#F4F4F5'} height={'100vh'}>
        <Box bg={'white'} p={5} mx={'auto'} rounded={'md'}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={5}
          >
            <Text>Daftar Produk</Text>
            <Button rounded={'full'} onClick={() => navigate('/add-product')}>
              <Icon icon={'icons8:plus'} />
              <Text>Tambah Produk</Text>
            </Button>
          </Box>
          <Box display={'flex'} justifyContent={'start'} gap={2}>
            <HStack
              display={'flex'}
              gap={2}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <InputGroup
                startElement={
                  <Icon icon={'ant-design:search-outlined'} color="black" />
                }
              >
                <Input
                  placeholder="Cari Produk"
                  borderColor={'#E6E6E6'}
                  width={'318px'}
                />
              </InputGroup>
              <SelectRoot
                collection={categoryCollectionDummy}
                // w={'240px'}
                size="sm"
              >
                <SelectTrigger>
                  <SelectValueText placeholder="pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categoryCollectionDummy.items.map((item) => (
                    <SelectItem key={item.value} item={item}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>

              <SelectRoot
                collection={sortCollectionDummy}
                size="sm"
                // w={'240px'}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="urutkan" />
                </SelectTrigger>
                <SelectContent>
                  {sortCollectionDummy.items.map((item) => (
                    <SelectItem
                      key={item.value}
                      item={item}
                      onClick={() => console.log(item.value)}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </HStack>
          </Box>
          <Stack
            display={'flex'}
            justifyContent={'space-between'}
            direction={'row'}
          >
            <Text>number produk</Text>
            <Checkbox>pilih semua</Checkbox>
          </Stack>
          <Tabs.Root defaultValue={'all'}>
            <Tabs.List>
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
              {isFound ? (
                <ListProduct />
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
      </Stack>
    </>
  );
}

export default ProductList;
