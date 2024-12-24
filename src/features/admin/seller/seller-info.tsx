import { Avatar } from '@/components/ui/avatar';
import { formatCurrency } from '@/features/add-other/format-currency';
import { Store } from '@/types/admin';
import { Button, Spinner, Table, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAllStores } from '../hooks';

export function SellerInfo() {
  const { data: stores, isLoading, isError, error } = useAllStores();

  const Navigate = useNavigate();

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (isError) {
    return <Text color="red.500">Error: {(error as Error).message}</Text>;
  }

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
            {stores?.map((store: Store, index: number) => (
              <Table.Row key={store.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <Avatar
                    src={
                      store.logo_img ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqsL-13Hag1GkSIL6dCH1pYm3CwQ7Tfqorcw&s'
                    }
                  />
                </Table.Cell>
                <Table.Cell>{store.name}</Table.Cell>
                <Table.Cell>{store.products.length}</Table.Cell>
                <Table.Cell>{formatCurrency(store.amount)}</Table.Cell>
                <Table.Cell textAlign={'end'}>
                  <Button onClick={() => Navigate(`/admin/seller/${store.id}`)}>
                    Visit
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
}
