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
import ListProduct from './listProduct';
import { InputGroup } from '@/components/ui/input-group';
import NotFoundCard from './notFound';
import { Checkbox } from '@/components/ui/checkbox';

function ProductList() {
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
  return (
    <>
      <Box width={'894px'} bg={'red.400'} p={5} mx={'auto'} rounded={'md'}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginBottom={5}
        >
          <Text>Daftar Produk</Text>
          <Button rounded={'full'}>
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
              w={'240px'}
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

            <SelectRoot collection={sortCollectionDummy} size="sm" w={'240px'}>
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

        {/* <HStack
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
            w={'240px'}
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

          <SelectRoot collection={sortCollectionDummy} size="sm" w={'240px'}>
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

        <Stack
          display={'flex'}
          justifyContent={'space-between'}
          direction={'row'}
        >
          <Text>number produk</Text>
          <Checkbox>pilih semua</Checkbox>
        </Stack>
        {isFound ? <CardProduct /> : <NotFoundCard />} */}

        {/* <Stack display={"flex"} direction={"column"} gap={5} justifyContent={"space-between"} marginTop={3}>
                <Stack display={"flex"} direction={"row"} border={"1px solid #E6E6E6"} p={5} justifyContent={"space-between"}>
                    <Box>
                        <img src="../../../../public/cardImage/Rectangle 40352.png" alt="product-image" />
                    </Box>
                    <Box flex={2}>
                        <Text>KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]</Text>
                        <Box display={"flex"} direction={"row"} gap={2}>
                            <Text>Rp. harga . </Text>
                            <Text>Stock: 20 . </Text>
                            <Text>SKU: 0219AKD192</Text>
                        </Box>
                        <Box display={"flex"} direction={"row"} gap={2} marginY={2}>
                            <Button rounded={"full"}>Ubah Harga</Button>
                            <Button rounded={"full"}>Ubah Stok</Button>
                            <Button rounded={"full"}>Lihat Halaman</Button>
                            <Button rounded={"full"}>...</Button>
                        </Box>
                    </Box>
                    <Stack display={"flex"} direction={"column"} justifyContent={"space-between"} gap={2} >
                        <Checkbox>

                        </Checkbox>
                        <Switch size={"lg"} colorPalette={"blue"} />
                    </Stack>
                </Stack>
            </Stack> */}

        {/* <Stack display={"flex"} direction={"column"} gap={5} justifyContent={"center"} alignItems={"center"} marginTop={3}>
                <Stack display={"flex"} direction={"row"} border={"1px solid #E6E6E6"} p={5} rounded={"sm"} width={"100%"} justifyContent={"center"}>
                    <Stack display={"flex"} direction={"row"} gap={2} alignItems={"center"}>
                        <Icon icon={"ant-design:search-outlined"} color="black" width={"40px"} />
                        <Box>

                            <Text>
                                Oops, produk yang kamu cari tidak ditemukan
                            </Text>
                            <Text>
                                Coba kata kunci lain atau tambahkan produk baru
                            </Text>
                        </Box>
                    </Stack>
                </Stack>
            </Stack> */}
      </Box>
    </>
  );
}

export default ProductList;
