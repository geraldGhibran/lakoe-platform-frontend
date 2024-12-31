import { formatCurrency } from '@/features/add-other/format-currency';
import { formatDate } from '@/features/add-other/format-date';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Spinner,
  StatLabel,
  StatRoot,
  StatValueText,
  Table,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from '@/components/ui/dialog';
import { Avatar } from '@/components/ui/avatar';
import {
  useProcessWithdrawRequest,
  useStoreAndWithdrawsAmount,
  useWithdrawRequests,
} from '../hooks';
import type { Withdraw } from '@/types/admin';

export default function Withdraw() {
  const { data: withdrawRequests = [], isLoading } = useWithdrawRequests();
  const { mutate: processRequest } = useProcessWithdrawRequest();
  const { data: amount } = useStoreAndWithdrawsAmount();

  const [selectedItem, setSelectedItem] = useState<{
    withdraw: Withdraw;
  } | null>(null);

  const handleProcess = (action: 'accept' | 'reject') => {
    if (selectedItem) {
      processRequest(
        { withdrawId: selectedItem.withdraw.id, action },
        {
          onSuccess: () => {
            setSelectedItem(null);
          },
        }
      );
    }
  };

  if (isLoading)
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

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={6}>
        <GridItem p={4} bg="purple.50" borderRadius="md">
          <StatRoot>
            <StatLabel>Wait for Withdraw</StatLabel>
            <StatValueText>
              {formatCurrency(amount?.totalStoreAmount ?? 0)}
            </StatValueText>
          </StatRoot>
        </GridItem>

        <GridItem p={4} bg="yellow.50" borderRadius="md">
          <StatRoot>
            <StatLabel>Pending Withdraw</StatLabel>
            <StatValueText>
              {formatCurrency(amount?.totalPendingAmount ?? 0)}
            </StatValueText>
          </StatRoot>
        </GridItem>

        <GridItem p={4} bg="blue.50" borderRadius="md">
          <StatRoot>
            <StatLabel>Withdrawed</StatLabel>
            <StatValueText>
              {formatCurrency(amount?.totalSuccessAmount ?? 0)}
            </StatValueText>
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
                <Table.ColumnHeader textAlign="center">
                  Action
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {withdrawRequests.map((item: Withdraw, index: number) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <Avatar
                      src={
                        item.store.logo_img ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqsL-13Hag1GkSIL6dCH1pYm3CwQ7Tfqorcw&s'
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>{item.store.name}</Table.Cell>
                  <Table.Cell>{formatDate(item.createAt)}</Table.Cell>
                  <Table.Cell>{formatCurrency(item.amount)}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <DialogRoot>
                      <DialogTrigger asChild>
                        <Button
                          bg="blue.500"
                          color="white"
                          borderRadius="full"
                          onClick={() =>
                            setSelectedItem({
                              withdraw: item,
                            })
                          }
                        >
                          Process
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Withdraw Details</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          {selectedItem && (
                            <Box fontSize={'1rem'} spaceY={2}>
                              <Flex alignItems={'center'} gap={5}>
                                <Avatar
                                  size={'2xl'}
                                  src={
                                    item.store.logo_img ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqsL-13Hag1GkSIL6dCH1pYm3CwQ7Tfqorcw&s'
                                  }
                                />
                                <Text fontSize={'2rem'}>
                                  {selectedItem.withdraw.store.name}
                                </Text>
                              </Flex>
                              <Text>
                                <strong>Bank Name:</strong>{' '}
                                {selectedItem.withdraw.store.bankAccount.bank}
                              </Text>
                              <Text>
                                <strong>Bank Account Name:</strong>{' '}
                                {
                                  selectedItem.withdraw.store.bankAccount
                                    .acc_name
                                }
                              </Text>
                              <Text>
                                <strong>Nomor Rekening:</strong>{' '}
                                {
                                  selectedItem.withdraw.store.bankAccount
                                    .acc_number
                                }
                              </Text>
                              <Text>
                                <strong>Nominal:</strong>{' '}
                                {formatCurrency(selectedItem.withdraw.amount)}
                              </Text>
                              <Text>
                                <strong>Date Requested:</strong>{' '}
                                {formatDate(selectedItem.withdraw.createAt)}
                              </Text>
                            </Box>
                          )}
                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleProcess('reject')}
                            >
                              Reject
                            </Button>
                          </DialogActionTrigger>
                          <Button onClick={() => handleProcess('accept')}>
                            Accept
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </DialogRoot>
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
