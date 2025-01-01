import { InputGroup } from '@/components/ui/input-group';
import {
  Box,
  createListCollection,
  HStack,
  Text,
  Input,
  Stack,
} from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { Field } from '@/components/ui/field';
import categoriesData from '@/data/categories.json';
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
  onCategoryChange: (value: number | null) => void;
}

export default function Header({
  // onSelectAll,
  totalProducts,
  handleSortChange,
  onSearchChange,
  onCategoryChange,
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
        <Box display="flex" width={'35%'}>
          <SelectRoot
            pos="relative"
            collection={createListCollection({
              items: categoriesData.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            })}
            size="sm"
            onValueChange={(details) =>
              onCategoryChange(Number(details.value[0]))
            }
          >
            <SelectTrigger>
              <SelectValueText placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent pos="relative" height="40vh">
              {categoriesData.map((category) => (
                <SelectItem
                  key={category.id}
                  item={{ label: category.name, value: category.id }}
                >
                  {category.name}
                </SelectItem>
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
      </Stack>
    </Box>
  );
}
