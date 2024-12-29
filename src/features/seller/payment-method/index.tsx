import { Box, Flex, Table, Text } from '@chakra-ui/react';
import CreateRekening from './components/createRekening';
import EditRekening from './components/editRekening';
import DeleteRekening from './components/deleteRekening';
import API from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';
import { useAccountStore } from '@/store/rekId';

const getRekAccountByStoreId = async (storeId: number) => {
  console.log('Fetching data for storeId:', storeId);
  try {
    const response = await API.get(`/bank/storeId`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rekening data:', error);
    throw error;
  }
};

export default function PaymentMethod() {
  const { user } = useAuthStore();
  const storeId = user?.store?.id;
  console.log('User Data:', user);
  console.log('Store ID:', storeId);

  const { data: rekAccount, isLoading } = useQuery({
    queryKey: ['rekAccount', storeId],
    queryFn: () => getRekAccountByStoreId(storeId as number),
    enabled: !!storeId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  console.log('isLoading:', isLoading);
  console.log('Rekening Account Data:', rekAccount);
  const setAccountId = useAccountStore((state) => state.setAccountId);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const accountData = rekAccount?.length > 0 ? rekAccount[0] : null;
  const items = [
    {
      id: 1,
      name: 'Full Name',
      category: accountData ? accountData.acc_name : '',
    },
    { id: 2, name: 'Bank', category: accountData ? accountData.bank : '' },
    {
      id: 3,
      name: 'No Rekening',
      category: accountData ? accountData.acc_number : '',
    },
  ];
  if (accountData) {
    setAccountId(accountData.id);
  }

  return (
    <Box display="flex" gap="20px" flexDir="column">
      <Text fontSize="20px" fontWeight="bold">
        Pembayaran
      </Text>
      <CreateRekening />
      <Flex gap="10px" rounded="md">
        <Box
          shadow="md"
          rounded="sm"
          overflow="hidden"
          bgColor="white"
          width="full"
        >
          <Text
            padding="15px"
            fontWeight="medium"
            fontSize="15px"
            borderBottom="1px solid gainsboro"
          >
            Rekening Bank
          </Text>
          <Flex padding="15px">
            <Table.Root unstyled width="full">
              <Table.Body>
                {items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell width="2%">:</Table.Cell>
                    <Table.Cell width="70%">{item.category}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            <Box gap="10px" display="flex" flexDir="column">
              <EditRekening />
              <DeleteRekening />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
