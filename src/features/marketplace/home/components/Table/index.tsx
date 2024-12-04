// import { Button } from "@/components/Button/Button"
import { useStore } from '@/store/counter';
import { Button, Flex, HStack, Span, Table, Text } from '@chakra-ui/react';

export const TableComponent = () => {
  const { increaseCount, decreaseCount } = useStore();

  return (
    <Table.Root size="sm" interactive variant="outline" borderRadius={'lg'}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Quantity</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
            <Table.Cell textAlign="end">
              <Flex justifyContent={'flex-end'}>
                <HStack gap="6">
                  <Button colorPalette={'red'} onClick={() => decreaseCount()}>
                    <Text>-</Text>
                  </Button>
                  <Span rounded={'full'}>
                    <Text fontSize={'lg'}>{item.quantity}</Text>
                  </Span>
                  <Button
                    colorPalette={'green'}
                    onClick={() => increaseCount()}
                  >
                    <Text>+</Text>
                  </Button>
                </HStack>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const items = [
  { id: 1, name: 'Laptop', quantity: 1, price: 999.99 },
  { id: 2, name: 'Coffee Maker', quantity: 1, price: 49.99 },
  { id: 3, name: 'Desk Chair', quantity: 1, price: 150.0 },
  { id: 4, name: 'Smartphone', quantity: 1, price: 799.99 },
  { id: 5, name: 'Headphones', quantity: 1, price: 199.99 },
];
