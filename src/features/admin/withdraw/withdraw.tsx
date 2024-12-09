import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatRoot, StatValueText } from '@/components/ui/stat';
import { formatCurrency } from '@/features/add-other/format-currency';
import { formatDate } from '@/features/add-other/format-date';
import { Box, Grid, GridItem, StatLabel, Table } from '@chakra-ui/react';

export default function Withdraw() {
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={6}>
        <GridItem p={4} bg="purple.50" borderRadius="md">
          <StatRoot>
            <StatLabel>Wait for Withdraw</StatLabel>
            <StatValueText>{formatCurrency(10000)}</StatValueText>
          </StatRoot>
        </GridItem>

        <GridItem p={4} bg="yellow.50" borderRadius="md">
          <StatRoot>
            <StatLabel>Pending Withdraw</StatLabel>
            <StatValueText>{formatCurrency(110000)}</StatValueText>
          </StatRoot>
        </GridItem>

        <GridItem p={4} bg="blue.50" borderRadius="md">
          <StatRoot>
            <StatLabel>Withdrawed</StatLabel>
            <StatValueText>{formatCurrency(140000)}</StatValueText>
          </StatRoot>
        </GridItem>
      </Grid>
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
                  <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                  <Table.Cell>
                    {formatCurrency(item.withdrawAmmount)}
                  </Table.Cell>
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

    withdrawAmmount: 11112,
    createdAt: '2024-11-11T11:01:20.680Z',
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Coffee Maker',

    withdrawAmmount: 22222,
    createdAt: '2024-03-11T11:02:20.680Z',
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Desk Chair',

    withdrawAmmount: 3333,
    createdAt: '2024-12-11T11:02:20.680Z',
  },
  {
    id: 4,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Smartphone',

    withdrawAmmount: 4444,
    createdAt: '2023-12-21T11:02:20.680Z',
  },
  {
    id: 5,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Headphones',

    withdrawAmmount: 55551,
    createdAt: '2023-02-21T11:02:20.680Z',
  },
];
