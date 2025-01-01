import { Box, Flex, Text, Spinner } from '@chakra-ui/react';
import { MdCrisisAlert } from 'react-icons/md';
import { Table } from '@chakra-ui/react';
import { TbHistoryToggle } from 'react-icons/tb';
import { SiWebmoney } from 'react-icons/si';
import MyChart from '@/components/Chart';
import { formatCurrency } from '@/features/add-other/format-currency';
import { useSellerData, useWithdraws } from '../hooks';
import WithdrawSeller from './components/withdrawSeller';
import { Withdraw } from '@/types/admin';
import { formatDate } from '@/features/add-other/format-date';

export const Dashboard = () => {
  const { data, isLoading, isError, error } = useSellerData();

  const withdraws = useWithdraws();

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
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <Box display="flex" flexDir="column" gap="20px">
      <Box
        display="flex"
        flexDir="column"
        border="1px solid gainsboro"
        gap="20px"
        padding="20px"
        rounded="md"
        bgColor="white"
      >
        <Text fontWeight="medium">Sales Summary</Text>
        <Flex gap="10px">
          <Box
            display="flex"
            width="full"
            alignItems="center"
            shadow="sm"
            justifyContent="center"
            padding="10px"
            fontSize="12px"
            bgColor="white"
            rounded="2xl"
          >
            <Flex flexDir="column">
              <Flex
                alignItems="center"
                gap="10px"
                fontSize="15px"
                fontWeight="bold"
              >
                Total Success Orders
                <MdCrisisAlert size="20px" color="orange" />
              </Flex>
              <Text fontSize="20px" color="blue">
                {
                  data?.invoices.filter(
                    (invoice) => invoice.status === 'DELIVERED'
                  ).length
                }
              </Text>
            </Flex>
          </Box>

          <Box
            display="flex"
            width="full"
            alignItems="center"
            shadow="sm"
            justifyContent="center"
            padding="10px"
            fontSize="12px"
            bgColor="white"
            rounded="2xl"
          >
            <Flex flexDir="column">
              <Flex
                alignItems="center"
                gap="10px"
                fontSize="15px"
                fontWeight="bold"
              >
                Total History Orders
                <TbHistoryToggle size="20px" color="blue" />
              </Flex>
              <Text fontSize="20px" color="green.500">
                {data?.invoices?.length}
              </Text>
            </Flex>
          </Box>

          <Box
            display="flex"
            width="full"
            alignItems="center"
            shadow="sm"
            justifyContent="center"
            padding="10px"
            fontSize="12px"
            bgColor="white"
            rounded="2xl"
          >
            <Flex flexDir="column">
              <Flex
                alignItems="center"
                gap="10px"
                fontSize="15px"
                fontWeight="bold"
              >
                Total Balance
                <SiWebmoney size="20px" color="red" />
              </Flex>
              <Text fontSize="20px" color="green">
                {formatCurrency(data?.amount || 0)}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <WithdrawSeller />
      </Box>

      {/* Table */}
      <Box
        padding="20px"
        border="1px solid gainsboro"
        rounded="md"
        bgColor="white"
      >
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row bgColor="white">
              <Table.ColumnHeader color="black">No</Table.ColumnHeader>
              <Table.ColumnHeader color="black">
                Request Date
              </Table.ColumnHeader>
              <Table.ColumnHeader color="black">Amount</Table.ColumnHeader>
              <Table.ColumnHeader color="black" textAlign="end">
                Status
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {withdraws.data?.map((item: Withdraw, index: number) => (
              <Table.Row bgColor="white" key={item.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{formatDate(item.createAt)}</Table.Cell>
                <Table.Cell>{formatCurrency(item.amount)}</Table.Cell>
                <Table.Cell
                  color={
                    item.status === 'SUCCESS'
                      ? 'green.500'
                      : item.status === 'FAILED'
                        ? 'red.500'
                        : 'gray.500'
                  }
                  textAlign="end"
                >
                  {item.status}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Chart */}
      <Box
        padding="20px"
        rounded="md"
        border="1px solid gainsboro"
        bgColor="white"
      >
        <MyChart />
      </Box>
    </Box>
  );
};
