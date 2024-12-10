import { Avatar } from '@/components/ui/avatar';
import { formatCurrency } from '@/features/add-other/format-currency';
import { Button, Table } from '@chakra-ui/react';

export function SellerInfo() {
  return (
    <>
      <Table.ScrollArea borderWidth="1px" rounded="md" height="100%">
        <Table.Root size="sm" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader>No</Table.ColumnHeader>
              <Table.ColumnHeader>Logo</Table.ColumnHeader>
              <Table.ColumnHeader>Store Name</Table.ColumnHeader>

              <Table.ColumnHeader>Total Product</Table.ColumnHeader>
              <Table.ColumnHeader>Total Income</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={'end'}>Detail</Table.ColumnHeader>
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
                <Table.Cell>{formatCurrency(item.totalIncome)}</Table.Cell>
                <Table.Cell textAlign={'end'}>
                  <Button>Visit</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
}
const items = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Laptop',
    totalProduct: '4',
    totalIncome: 1111532,
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Coffee Maker',
    totalProduct: '2',
    totalIncome: 22222,
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Desk Chair',
    totalProduct: '3',
    totalIncome: 3333,
  },
  {
    id: 4,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Smartphone',
    totalProduct: '11',
    totalIncome: 444446,
  },
  {
    id: 5,
    image: 'https://randomuser.me/api/portraits/men/70.jpg',
    name: 'Headphones',
    totalProduct: '44',
    totalIncome: 555544,
  },
];
