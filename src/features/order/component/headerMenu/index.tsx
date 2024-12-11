import { Box, HStack, Input, createListCollection } from '@chakra-ui/react';
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
        <Field w={'35%'}>
          <SelectRoot multiple collection={couriers} size="md" w={'100%'}>
            <SelectTrigger>
              <SelectValueText placeholder="Kurir " />
            </SelectTrigger>
            <SelectContent>
              {couriers.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  {movie.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
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
