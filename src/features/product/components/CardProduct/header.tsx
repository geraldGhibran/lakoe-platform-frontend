import { InputGroup } from '@/components/ui/input-group';
import {
  Box,
  createListCollection,
  HStack,
  Text,
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
import DeleteConfirm from '../modal/delete-confirm';
import NonactiveConfirm from '../modal/nonactive-confirm';

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
  onSelectAll: (checked: boolean) => void; // New prop to handle the "Pilih Semua" checkbox change
}

export default function Header({ onSelectAll }: HeaderProps) {
  return (
    <Box w={'100%'} bgColor={'white'} mt={'-39px'} py={5}>
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
          <Input placeholder="Cari Pesanan" />
        </InputGroup>
        <Field w={'35%'}>
          <SelectRoot
            multiple
            collection={categoryCollectionDummy}
            size="md"
            w={'100%'}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Semua kategori " />
            </SelectTrigger>
            <SelectContent>
              {categoryCollectionDummy.items.map((category) => (
                <SelectItem item={category} key={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
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
            5 Produk
          </Text>
        </Box>
        <Box>
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
            <Checkbox
              mt={2}
              px={2}
              colorPalette={'blue'}
              onChange={(e) =>
                onSelectAll((e.target as HTMLInputElement).checked)
              } // Call the handler when the checkbox is toggled
            >
              Pilih Semua
            </Checkbox>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
