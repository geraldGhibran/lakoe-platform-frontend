import { InputGroup } from '@/components/ui/input-group';
import {
  Box,
  createListCollection,
  HStack,
  Text,
  Flex,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { Field } from '@/components/ui/field';
// import DeleteConfirm from '../modal/delete-confirm';
// import NonactiveConfirm from '../modal/nonactive-confirm';

const categoryCollectionDummy = createListCollection({
  items: [
    { label: 'Baju', value: 'Baju' },
    { label: 'Celana', value: 'Celana' },
    { label: 'Sepatu', value: 'Sepatu' },
  ],
});
const sortCollectionDummy = createListCollection({
  items: [
    { label: 'Terbaru', value: 'Terbaru' },
    { label: 'Terlama', value: 'Terlama' },
    { label: 'Termahal', value: 'Termahal' },
    { label: 'Termurah', value: 'Termurah' },
  ],
});

interface HeaderProps {
  onSelectAll: (checked: boolean) => void;
  totalProducts: number;
  handleSortChange: (value: string) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Header({
  // onSelectAll,
  totalProducts,
  handleSortChange,
  onSearchChange,
}: HeaderProps) {
  return (
    <Box
      zIndex="dropdown"
      w={'100%'}
      bgColor="white"
      px="20px"
      border="1px solid gainsboro"
      position="sticky"
      top="40px"
      py={5}
    >
      <HStack direction={'row'} mt={5}>
        <InputGroup
          startElement={
            <Icon
              icon="lets-icons:file-dock-search-light"
              width={'20px'}
              height={'20px'}
            />
          }
          width="35%"
        >
          <Input placeholder="Cari Pesanan" onChange={onSearchChange} />
        </InputGroup>
        <Box width={'35%'}>
          <SelectRoot multiple collection={categoryCollectionDummy} size="sm">
            <SelectTrigger>
              <SelectValueText placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categoryCollectionDummy.items.map((data) => (
                <Flex gap="3" margin="4px">
                  <Checkbox border="2px solid #B1B1B1" colorPalette="blue" />
                  {data.label}
                </Flex>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Field w={'35%'}>
          <SelectRoot collection={sortCollectionDummy} size="md" w={'100%'}>
            <SelectTrigger>
              <SelectValueText placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              {sortCollectionDummy.items.map((sort) => (
                <SelectItem
                  item={sort}
                  key={sort.value}
                  onClick={() => handleSortChange(sort.label)}
                  _selected={{ color: 'blue.500' }}
                >
                  {sort.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
      </HStack>
      <Stack
        display={'flex'}
        justifyContent={'space-between'}
        direction={'row'}
        py={3}
      >
        <Box>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {totalProducts} Produk
          </Text>
        </Box>
        {/* <Box>
          <Stack direction={'row'} gap={1}>
            <Box
              border={'1px solid #E6E6E6'}
              borderRadius={'full'}
              p={2}
              w={'38px'}
            >
              <DeleteConfirm quantity={5} />
            </Box>
            <NonactiveConfirm quantity={5} />
            <Flex gap="2" alignItems="center">
              Pilih Semua
              <Checkbox
                colorPalette={'blue'}
                onChange={(e) =>
                  onSelectAll((e.target as HTMLInputElement).checked)
                }
              />
            </Flex>
          </Stack>
        </Box> */}
      </Stack>
    </Box>
  );
}
