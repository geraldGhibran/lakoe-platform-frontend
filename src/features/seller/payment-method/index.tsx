import { Box, Flex, Table, Text } from '@chakra-ui/react';
import CreateRekening from './components/createRekening';
import EditRekening from './components/editRekening';
import DeleteRekening from './components/deleteRekening';

const items = [
  { id: 1, name: 'Full Name', category: 'Gerald' },
  { id: 2, name: 'Bank Name', category: 'mandiri' },
  { id: 3, name: 'Account Number', category: '9867875858' },
];

export default function PaymentMethod() {
  return (
    <Box display="flex" gap="20px" flexDir="column">
      <Text fontSize="20px" fontWeight="bold">
        Pembayaran
      </Text>
      <CreateRekening />
      <Flex gap="10px" rounded="md">
        {/* E-Wallet */}
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
                    <Table.Cell></Table.Cell>
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
