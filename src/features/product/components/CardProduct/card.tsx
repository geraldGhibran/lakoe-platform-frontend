// import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Box, Button, Image, Stack, Text } from '@chakra-ui/react';
// import ActionMenu from '../modal/action-menu';
import ChangeStock from '../modal/stock';
import ChangePrice from '../modal/price';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
// import DeleteConfirmMenu from '../modal/delete-menu';
import DeleteProduct from './components/deleteProduct';

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
    // isChecked,
    // onCheckboxChange,
    onSwitchChange,
  } = props;

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    navigate(`/product/detail/${name}`);
  };

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
          pos="relative"
          display={'flex'}
          direction={'row'}
          border={'1px solid #E6E6E6'}
          p={5}
          justifyContent={'space-between'}
        >
          <Box>
            <Image boxSize="100px" src={image} />
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
                _hover={{ bgColor: 'gainsboro' }}
                border={'1px solid black'}
                onClick={handleButtonClick}
              >
                <Icon icon="system-uicons:chain" />
                {Url}
              </Button>
              <DeleteProduct id={props.id} />
            </Box>
          </Box>
          <Stack
            display={'flex'}
            direction={'column'}
            justifyContent={'space-between'}
            gap={2}
          >
            {/* <Checkbox
              colorPalette={'blue'}
              checked={isChecked}
              onChange={(e) =>
                onCheckboxChange((e.target as HTMLInputElement).checked)
              }
            /> */}
            <Switch
              pos="absolute"
              bottom="0"
              right="0"
              margin="30px"
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
