import { formatCurrency } from '@/features/add-other/format-currency';
import { Box, Image, Stack, Text } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
import ConfirmOrder from './confirmOrder';
import { useNavigate } from 'react-router-dom';

interface Image {
  id: number;
  url: string;
  product_id: number;
}

interface Product {
  name: string;
  image: Image[];
}

export interface Order {
  id: number;
  amount: number;
  total_amount: number;
  service_charge: number;
  status: string;
  courier_price: number;
  invoice_id: string;
  Product: Product[];
}

export default function OrderItem({
  id,
  status,
  invoice_id,
  Product,
  total_amount,
}: Order) {
  const navigate = useNavigate();
  const productName = Product[0]?.name;
  const productImageUrl = Product[0]?.image[0]?.url;

  const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PAID':
        return {
          bgColor: '#4CAF50',
          display: 'flex',
          actionText: 'Proses Pesanan',
        };
      case 'WAIT_TO_PICKUP':
        return {
          bgColor: '#FF9800',
          display: 'none',
          actionText: 'Lihat Rincian Pembelian',
          isNavigate: true,
        };
      case 'DELIVERING':
        return {
          bgColor: '#FF9800',
          display: 'none',
          actionText: 'Lihat Rincian Pembelian',
          isNavigate: true,
        };
      default:
        return {
          bgColor: '#E6E6E6',
          display: 'none',
          actionText: 'Tidak Diketahui',
        };
    }
  };

  const { bgColor, actionText, display } = getStatusStyles(status);

  const handleNavigate = () => {
    navigate(`/detail-order/${invoice_id}`, {
      state: { status, invoice_id, productName, id },
    });
  };

  return (
    <Box
      w={'100%'}
      p={5}
      border={'2px solid #E6E6E6'}
      borderRadius={'5px'}
      mt={5}
      cursor="pointer"
      onClick={handleNavigate}
    >
      <Stack
        pos="relative"
        direction={'row'}
        justifyContent={'space-between'}
        borderBottom={'3px solid #E6E6E6'}
      >
        <Box>
          <Text
            p={2}
            bgColor={bgColor}
            borderRadius="5px"
            fontWeight={'500'}
            fontSize={'sm'}
            w={'max-content'}
          >
            {status}
          </Text>
          <Text p={2} color={'#909090'}>
            {invoice_id}
          </Text>
        </Box>
        <Box pos="absolute" right="0">
          <ConfirmOrder text={actionText} id={id} display={display} />
        </Box>
        {/* <Button
          borderRadius={'100px'}
          bg={'white'}
          color={'black'}
          border={'1px solid black'}
          onClick={handleButtonClick}
        >
          {actionText}
        </Button> */}
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'}>
          <Image src={productImageUrl} w={'70px'} h={'80px'} mt={2}></Image>
          <Box p={2}>
            <Text fontWeight={'500'} fontSize={'18px'}>
              {productName}
            </Text>
          </Box>
        </Stack>
        <Box p={2}>
          <Text color={'#909090'} pb={2}>
            Total Belanja
          </Text>
          <Text fontWeight="500">{formatCurrency(total_amount)}</Text>
        </Box>
      </Stack>
    </Box>
  );
}
