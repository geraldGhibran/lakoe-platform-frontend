import { Box, Stack, Tabs, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import HeaderMenu from '../component/headerMenu';
import OrderItem, { Order } from '../component/orderItem';
import '@/styles/styes.css';
import { useGetInvoices } from '../hooks/use-get-invoices';

export default function OrderPage() {
  const { data: invoices, isLoading, error } = useGetInvoices();
  const [value, setValue] = useState<string | null>('first');

  const filterOrders = (status: string) => {
    return invoices
      ? invoices?.invoices?.filter((order: Order) => order.status === status)
      : [];
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        colorPalette="teal"
      >
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return <Text>Error loading invoices: {error.message}</Text>;
  }
  return (
    <Stack direction="row" w={'100%'}>
      <Box bg="gray.100" w={'100%'}>
        <Tabs.Root
          bg={'white'}
          value={value}
          onValueChange={(e) => setValue(e.value)}
          p={5}
          variant="plain"
          width={'100%'}
        >
          <Text fontWeight={'bold'} fontSize={'2xl'} mb={5}>
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
              fontSize={'xs'}
              borderBottom="4px solid transparent"
            >
              All
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
              fontSize={'xs'}
              borderBottom="4px solid transparent"
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('UNPAID').length > 0 &&
                  `${filterOrders('UNPAID').length}`}
              </Box>
              UNPAID
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
              fontSize={'xs'}
              borderBottom="4px solid transparent"
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('PAID').length > 0 &&
                  `${filterOrders('PAID').length}`}
              </Box>
              PAID
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
              fontSize={'xs'}
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('PROCESS').length > 0 &&
                  `${filterOrders('PROCESS').length}`}
              </Box>
              PROCESS
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
              fontSize={'xs'}
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('WAIT_TO_PICKUP').length > 0 &&
                  `${filterOrders('WAIT_TO_PICKUP').length}`}
              </Box>
              WAIT TO PICKUP
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
              fontSize={'xs'}
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
              >
                {''}
                {filterOrders('DELIVERING').length > 0 &&
                  `${filterOrders('DELIVERING').length}`}
              </Box>
              DELIVERING
            </Tabs.Trigger>
            <Tabs.Trigger
              value="seventh"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
              fontSize={'xs'}
            >
              <Box
                bgColor={'#0086B4'}
                color={'white'}
                borderRadius={'50%'}
                w={'20px'}
                h={'20px'}
              >
                {''}
                {filterOrders('DELIVERED').length > 0 &&
                  `${filterOrders('DELIVERED').length}`}
              </Box>
              DELIVERED
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            value="first"
            overflowY="auto"
            className="hide-scrollbar"
            h="calc(100vh - 120px)"
          >
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
            {invoices?.invoices?.map((order: Order, index: number) => (
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
            {filterOrders('UNPAID').map((order: Order, index: number) => (
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
            {filterOrders('PAID').map((order: Order, index: number) => (
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
            {filterOrders('PROCESS').map((order: Order, index: number) => (
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
            {filterOrders('WAIT_TO_PICKUP').map(
              (order: Order, index: number) => (
                <OrderItem key={index} {...order} />
              )
            )}
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
            {filterOrders('DELIVERING').map((order: Order, index: number) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            value="seventh"
            overflowY="auto"
            h="calc(100vh - 120px)"
          >
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
            {filterOrders('DELIVERED').map((order: Order, index: number) => (
              <OrderItem key={index} {...order} />
            ))}
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Stack>
  );
}
