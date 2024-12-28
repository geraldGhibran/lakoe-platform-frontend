import { Box, Flex, Text } from '@chakra-ui/react';
import { MdCrisisAlert } from 'react-icons/md';
import { Table } from '@chakra-ui/react';
import { TbHistoryToggle } from 'react-icons/tb';
import { SiWebmoney } from 'react-icons/si';
import MyChart from '@/components/Chart';
import { formatCurrency } from '@/features/add-other/format-currency';
import WithdrawSeller from './components/withdrawSeller';

export const Dashboard = () => {
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
                25
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
                25
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
                {formatCurrency(5000000)}
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
              <Table.ColumnHeader color="black">Product</Table.ColumnHeader>
              <Table.ColumnHeader color="black">Category</Table.ColumnHeader>
              <Table.ColumnHeader color="black" textAlign="end">
                Price
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row bgColor="white" key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell textAlign="end">{item.price}</Table.Cell>
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

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
];
