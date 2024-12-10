import {
  Box,
  HStack,
  Input,
  InputAddon,
  Group,
  createListCollection,
} from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Field } from '@/components/ui/field';

export default function HeaderMenu() {
  const frameworks = createListCollection({
    items: [
      { label: 'React.js', value: 'react' },
      { label: 'Vue.js', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
    ],
  });
  const [checked, setChecked] = useState(false);
  return (
    <Box w={'100%'} bgColor={'white'} mt={'-39px'} py={5}>
      <HStack direction={'row'} gap={5}>
        <Group attached w={'35%'}>
          <InputAddon bgColor={'transparent'} borderRight={'none'}>
            <Icon
              icon="lets-icons:file-dock-search-light"
              width={'20px'}
              height={'20px'}
            />
          </InputAddon>
          <Input borderLeft={'none'} placeholder="Cari pesanan" />
        </Group>
        <Field w={'35%'}>
          <SelectRoot collection={frameworks}>
            <SelectTrigger>
              <SelectValueText placeholder="Kurir" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((movie) => (
                <SelectItem item={movie} key={movie.value}>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(e) => setChecked(!!e.checked)}
                  >
                    {movie.label}
                  </Checkbox>
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
        <Field w={'35%'}>
          <SelectRoot collection={frameworks}>
            <SelectTrigger>
              <SelectValueText placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((movie) => (
                <Checkbox value={movie.value}>{movie.label}</Checkbox>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
      </HStack>
    </Box>
  );
}
