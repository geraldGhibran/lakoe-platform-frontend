import {
  Box,
  Flex,
  HStack,
  Input,
  createListCollection,
} from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { InputGroup } from '@/components/ui/input-group';
import { Icon } from '@iconify/react';
import { Field } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';

export default function HeaderMenu() {
  const couriers = createListCollection({
    items: [
      { label: 'GoSend', value: 'GoSend' },
      { label: 'GrabExpress', value: 'GrabExpress' },
      { label: 'AnterAja', value: 'AnterAja' },
      { label: 'JNE', value: 'JNE' },
      { label: 'J&T', value: 'J&T' },
      { label: 'LionParcel', value: 'LionParcel' },
      { label: 'NinjaXpress', value: 'NinjaXpress' },
      { label: 'PosIndonesia', value: 'PosIndonesia' },
    ],
  });
  const timeOrder = createListCollection({
    items: [
      { label: 'Paling Baru', value: 'Paling Baru' },
      { label: 'Paling Lama', value: 'Paling Lama' },
      { label: 'Respons Tercepat', value: 'Respons Tercepat' },
      { label: 'Respons Terlama', value: 'Respons Terlama' },
    ],
  });

  return (
    <Box w={'100%'} bgColor={'white'} mt={'-39px'} py={5}>
      <HStack direction={'row'} gap={5}>
        {' '}
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
          <Input placeholder="Cari pesanan" />
        </InputGroup>
        <Box width={'35%'}>
          <SelectRoot multiple collection={couriers} size="sm">
            <SelectTrigger>
              <SelectValueText placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              {couriers.items.map((data) => (
                <Flex gap="3" margin="4px">
                  <Checkbox border="2px solid #B1B1B1" colorPalette="blue" />
                  {data.label}
                </Flex>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Field w={'35%'}>
          <SelectRoot collection={timeOrder} size="md" w={'100%'}>
            <SelectTrigger>
              <SelectValueText placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              {timeOrder.items.map((time) => (
                <SelectItem
                  item={time}
                  key={time.value}
                  _selected={{ color: 'blue.500' }}
                >
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
      </HStack>
    </Box>
  );
}
