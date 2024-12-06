import { Avatar } from '@/components/ui/avatar';
import { StatRoot, StatValueText } from '@/components/ui/stat';
import {
  Box,
  Button,
  Grid,
  GridItem,
  StatLabel,
  Table,
} from '@chakra-ui/react';

export default function AdminHomePage() {
  return (
    <Box bg={'white'}>
      <Box color={'black'} p={5}>
        {/* Top Stats */}
        <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
          <GridItem p={4} bg="blue.50" borderRadius="md">
            <StatRoot>
              <StatLabel>Total Income All Seller</StatLabel>
              <StatValueText>123</StatValueText>
            </StatRoot>
          </GridItem>

          <GridItem p={4} bg="green.50" borderRadius="md">
            <StatRoot>
              <StatLabel>Total Income</StatLabel>
              <StatValueText>123</StatValueText>
            </StatRoot>
          </GridItem>

          <GridItem p={4} bg="purple.50" borderRadius="md">
            <StatRoot>
              <StatLabel>Withdrawed</StatLabel>
              <StatValueText>123</StatValueText>
            </StatRoot>
          </GridItem>

          <GridItem p={4} bg="yellow.50" borderRadius="md">
            <StatRoot>
              <StatLabel>Wait for Withdraw</StatLabel>
              <StatValueText>123</StatValueText>
            </StatRoot>
          </GridItem>
        </Grid>
      </Box>
      <Box>
        <Table.ScrollArea borderWidth="1px" rounded="md" height="500px">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>No</Table.ColumnHeader>
                <Table.ColumnHeader>Logo</Table.ColumnHeader>
                <Table.ColumnHeader>Store Name</Table.ColumnHeader>

                <Table.ColumnHeader>Total Product</Table.ColumnHeader>
                <Table.ColumnHeader>Total Income</Table.ColumnHeader>
                <Table.ColumnHeader textAlign={'end'}>
                  Detail
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((item, index) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <Avatar src={item.image} />
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.totalProduct}</Table.Cell>
                  <Table.Cell>{item.totalIncome}</Table.Cell>
                  <Table.Cell textAlign={'end'}>
                    <Button>Detail</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Box>
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
