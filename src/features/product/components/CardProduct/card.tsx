import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import ActionMenu from '../modal/action-menu';
import ChangeStock from '../modal/stock';
import ChangePrice from '../modal/price';
import { Icon } from '@iconify/react';

interface CardProductProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  sku: string;
  isActive: boolean;
  isChecked: boolean;
  Url: string;
  onCheckboxChange: (checked: boolean) => void;
  onSwitchChange: (checked: boolean) => void;
}
export default function CardProduct(props: CardProductProps) {
  const {
    name,
    image,
    price,
    stock,
    sku,
    Url,
    isActive,
    isChecked,
    onCheckboxChange,
    onSwitchChange,
  } = props;
  return (
    <>
      <Stack
        display={'flex'}
        direction={'column'}
        gap={5}
        justifyContent={'space-between'}
        marginTop={3}
      >
        <Stack
          display={'flex'}
          direction={'row'}
          border={'1px solid #E6E6E6'}
          p={5}
          justifyContent={'space-between'}
        >
          <Box>
            <img src={image} />
          </Box>
          <Box flex={2}>
            <Text>{name}</Text>
            <Box display={'flex'} direction={'row'} gap={2}>
              <Text>Rp. {price.toLocaleString('id-ID')} . </Text>
              <Text>Stock: {stock} . </Text>
              <Text>SKU: 0{sku}</Text>
            </Box>
            <Box display={'flex'} direction={'row'} gap={2} marginY={2}>
              <ChangePrice name={name} />
              <ChangeStock name={name} />
              <Button
                rounded={'full'}
                bg={'white'}
                color={'black'}
                border={'1px solid black'}
              >
                <Icon icon="system-uicons:chain" />
                {Url}
              </Button>
              <ActionMenu name={name} />
            </Box>
          </Box>
          <Stack
            display={'flex'}
            direction={'column'}
            justifyContent={'space-between'}
            gap={2}
          >
            <Checkbox
              colorPalette={'blue'}
              checked={isChecked}
              onChange={(e) =>
                onCheckboxChange((e.target as HTMLInputElement).checked)
              }
            />
            <Switch
              size={'lg'}
              colorPalette={'blue'}
              checked={isActive}
              style={{
                transition: 'transform 0.3s ease, background-color 0.3s ease;',
              }}
              onChange={(e) =>
                onSwitchChange((e.target as HTMLInputElement).checked)
              }
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
