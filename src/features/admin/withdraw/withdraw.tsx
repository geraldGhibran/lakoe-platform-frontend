import { Avatar } from '@/components/ui/avatar';
import { Box, Button, Table } from '@chakra-ui/react';

export default function Withdraw() {
  return (
    <>
      <Box>
        <Table.ScrollArea borderWidth="1px" rounded="md" height="100%">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>No</Table.ColumnHeader>
                <Table.ColumnHeader>Logo</Table.ColumnHeader>
                <Table.ColumnHeader>Store Name</Table.ColumnHeader>
                <Table.ColumnHeader>Date Request</Table.ColumnHeader>
                <Table.ColumnHeader>Withdraw Amount</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={'center'}>
                  Action
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body bg={'red'}>
              {items.map((item, index) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <Avatar src={item.image} />
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>123</Table.Cell>
                  <Table.Cell>{item.totalProduct}</Table.Cell>
                  <Table.Cell textAlign={'center'}>
                    <Button borderRadius={'full'} mr={1}>
                      Accept
                    </Button>
                    <Button
                      borderRadius={'full'}
                      ml={1}
                      bg={'red'}
                      color={'white'}
                    >
                      Reject
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </>
  );
}

const items = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Laptop',
    totalProduct: '4',
    totalIncome: '11111',
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Coffee Maker',
    totalProduct: '2',
    totalIncome: '22222',
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Desk Chair',
    totalProduct: '3',
    totalIncome: '3333',
  },
  {
    id: 4,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Smartphone',
    totalProduct: '11',
    totalIncome: '4444',
  },
  {
    id: 5,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Headphones',
    totalProduct: '44',
    totalIncome: '5555',
  },
];
