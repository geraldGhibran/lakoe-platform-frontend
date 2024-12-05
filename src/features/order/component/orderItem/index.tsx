import { Box, Text, Stack, Button, Image } from '@chakra-ui/react';

interface OrderItemProps {
  status: string;
  invoice: string;
  name: string;
  action?: string;
  quantity: number;
  image: string;
  total: number;
}

export default function OrderItem({
  status,
  invoice,
  name,
  quantity,
  image,
  total,
}: OrderItemProps) {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'belum dibayar':
        return { bgColor: '#E8C600', actionText: 'Hubungi Pembeli' };
      case 'pesanan baru':
        return { bgColor: '#4CAF50', actionText: 'Proses Pesanan' };
      case 'siap dikirim':
        return { bgColor: '#2196F3', actionText: 'Kabari Pembeli' };
      case 'dalam pengiriman':
        return { bgColor: '#FF9800', actionText: 'Lihat Rincian Pembelian' };
      case 'pesanan selesai':
        return { bgColor: '#9E9E9E', actionText: 'Hubungi Pembeli' };
      default:
        return { bgColor: '#E6E6E6', actionText: 'Tidak Diketahui' };
    }
  };

  const { bgColor, actionText } = getStatusStyles(status);

  return (
    <Box
      w={'100%'}
      p={5}
      border={'2px solid #E6E6E6'}
      borderRadius={'5px'}
      mt={5}
    >
      <Stack
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
            {invoice}
          </Text>
        </Box>
        <Button
          borderRadius={'100px'}
          bg={'white'}
          color={'black'}
          border={'1px solid black'}
        >
          {actionText}
        </Button>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'}>
          <Image src={image} w={'70px'} h={'80px'} mt={2}></Image>
          <Box p={2}>
            <Text fontWeight={'500'} fontSize={'18px'}>
              {name}
            </Text>
            <Text color={'#909090'}>{quantity} Barang</Text>
          </Box>
        </Stack>
        <Box p={2}>
          <Text color={'#909090'} pb={2}>
            Total Belanja
          </Text>
          <Text fontWeight="500">RP{total}</Text>
        </Box>
      </Stack>
    </Box>
  );
}
