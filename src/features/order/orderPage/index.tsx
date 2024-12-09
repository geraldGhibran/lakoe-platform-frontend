import { Box, Stack, Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';
import HeaderMenu from '../component/headerMenu';
import OrderItem from '../component/orderItem';

export default function OrderPage() {
  const [value, setValue] = useState<string | null>('first');

  const orders = [
    {
      status: 'Belum Dibayar',
      invoice: 'INV-00123',
      name: 'Produk A',
      quantity: 2,
      image: 'cardImage/Rectangle 40352.png',
      total: 150000,
    },

    {
      status: 'Belum Dibayar',
      invoice: 'INV-00123',
      name: 'Produk A',
      quantity: 2,
      image: 'cardImage/Rectangle 40352.png',
      total: 150000,
    },
    {
      status: 'Pesanan Baru',
      invoice: 'INV-00124',
      name: 'Produk B',
      quantity: 1,
      image: 'cardImage/Rectangle 40352.png',
      total: 200000,
    },
    {
      status: 'Siap Dikirim',
      invoice: 'INV-00125',
      name: 'Produk C',
      quantity: 3,
      image: 'cardImage/Rectangle 40352.png',
      total: 300000,
    },
    {
      status: 'Dalam Pengiriman',
      invoice: 'INV-00126',
      name: 'Produk D',
      quantity: 4,
      image: 'cardImage/Rectangle 40352.png',
      total: 400000,
    },
    {
      status: 'Pesanan Selesai',
      invoice: 'INV-00127',
      name: 'Produk E',
      quantity: 5,
      image: 'https://via.placeholder.com/70',
      total: 500000,
    },
    {
      status: 'Pesanan Selesai',
      invoice: 'INV-00127',
      name: 'Produk E',
      quantity: 5,
      image: 'https://via.placeholder.com/70',
      total: 500000,
    },
    {
      status: 'Pesanan Selesai',
      invoice: 'INV-00127',
      name: 'Produk E',
      quantity: 5,
      image: 'https://via.placeholder.com/70',
      total: 500000,
    },
    {
      status: 'Pesanan Selesai',
      invoice: 'INV-00127',
      name: 'Produk E',
      quantity: 5,
      image: 'https://via.placeholder.com/70',
      total: 500000,
    },
  ];

  const filterOrders = (status: string) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <Stack direction="row">
      <Box bg="gray.100">
        <Tabs.Root
          bg={'white'}
          value={value}
          onValueChange={(e) => setValue(e.value)}
          p={5}
          variant="plain"
        >
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Daftar Pesanan
          </Text>
          <Tabs.List display={'flex'} w={'100%'}>
            <Tabs.Trigger
              value="first"
              flex={1}
              textAlign={'center'}
              justifyContent={'center'}
              py={2}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              Semua
            </Tabs.Trigger>
            <Tabs.Trigger
              value="second"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('Belum Dibayar').length > 0 &&
                  `${filterOrders('Belum Dibayar').length}`}
              </Box>
              Belum Dibayar
            </Tabs.Trigger>
            <Tabs.Trigger
              value="third"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('Pesanan Baru').length > 0 &&
                  `${filterOrders('Pesanan Baru').length}`}
              </Box>
              Pesanan Baru
            </Tabs.Trigger>
            <Tabs.Trigger
              value="fourth"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('Siap Dikirim').length > 0 &&
                  `${filterOrders('Siap Dikirim').length}`}
              </Box>
              Siap Dikirim
            </Tabs.Trigger>
            <Tabs.Trigger
              value="fifth"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('Dalam Pengiriman').length > 0 &&
                  `${filterOrders('Dalam Pengiriman').length}`}
              </Box>
              Dalam Pengiriman
            </Tabs.Trigger>
            <Tabs.Trigger
              value="sixth"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('Pesanan Selesai').length > 0 &&
                  `${filterOrders('Pesanan Selesai').length}`}
              </Box>
              Pesanan selesai
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="first" overflowY="auto" h="calc(100vh - 120px)">
            <Box
              position="sticky"
              top="0"
              bg="white"
              zIndex="10"
              borderBottom="1px solid #E6E6E6"
              py={4}
            >
              <HeaderMenu />
            </Box>
            {orders.map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
          <Tabs.Content value="second" overflowY="auto" h="calc(100vh - 120px)">
            <Box
              position="sticky"
              top="0"
              bg="white"
              zIndex="10"
              borderBottom="1px solid #E6E6E6"
              py={4}
            >
              <HeaderMenu />
            </Box>
            {filterOrders('Belum Dibayar').map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
          <Tabs.Content value="third" overflowY="auto" h="calc(100vh - 120px)">
            <Box
              position="sticky"
              top="0"
              bg="white"
              zIndex="10"
              borderBottom="1px solid #E6E6E6"
              py={4}
            >
              <HeaderMenu />
            </Box>
            {filterOrders('Pesanan Baru').map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
          <Tabs.Content value="fourth" overflowY="auto" h="calc(100vh - 120px)">
            <Box
              position="sticky"
              top="0"
              bg="white"
              zIndex="10"
              borderBottom="1px solid #E6E6E6"
              py={4}
            >
              <HeaderMenu />
            </Box>
            {filterOrders('Siap Dikirim').map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
          <Tabs.Content value="fifth" overflowY="auto" h="calc(100vh - 120px)">
            <Box
              position="sticky"
              top="0"
              bg="white"
              zIndex="10"
              borderBottom="1px solid #E6E6E6"
              py={4}
            >
              <HeaderMenu />
            </Box>
            {filterOrders('Dalam Pengiriman').map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
          <Tabs.Content value="sixth" overflowY="auto" h="calc(100vh - 120px)">
            <Box
              position="sticky"
              top="0"
              bg="white"
              zIndex="10"
              borderBottom="1px solid #E6E6E6"
              py={4}
            >
              <HeaderMenu />
            </Box>
            {filterOrders('Pesanan Selesai').map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Stack>
  );
}
