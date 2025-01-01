import { Avatar } from '@/components/ui/avatar';
import { StatRoot, StatValueText } from '@/components/ui/stat';
import { formatCurrency } from '@/features/add-other/format-currency';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Spinner,
  StatLabel,
  Text,
} from '@chakra-ui/react';
import { Tooltip } from 'react-leaflet';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  useAllStores,
  useStoreAndWithdrawsAmount,
  useTopSeller,
} from '../hooks';

export default function AdminHomePage() {
  const { data: stores, isLoading, isError, error } = useTopSeller();
  const { data: amount } = useStoreAndWithdrawsAmount();
  const { data: store } = useAllStores();

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (isError) {
    return <Text color="red.500">Error: {(error as Error).message}</Text>;
  }
  const data = [
    { name: 'Jan', sales: 400 },
    { name: 'Feb', sales: 300 },
    { name: 'Mar', sales: 500 },
    { name: 'Apr', sales: 200 },
    { name: 'May', sales: 350 },
    { name: 'Jan', sales: 1110 },
  ];
  const dataTest = store?.map((item) => ({
    name: item.name,
    sales: item.invoices.length,
  }));
  return (
    <Box bg={'white'}>
      <Box color={'black'} p={5}>
        {/* Top Stats */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
          <GridItem p={4} bg="blue.50" borderRadius="md">
            <StatRoot>
              <StatLabel>Total Income All Seller</StatLabel>
              <StatValueText>
                {formatCurrency(amount?.totalStoreAmount ?? 0)}
              </StatValueText>
            </StatRoot>
          </GridItem>

          <GridItem p={4} bg="green.50" borderRadius="md">
            <StatRoot>
              <StatLabel>Total Income</StatLabel>
              <StatValueText>
                {formatCurrency(amount?.totalFeeAmount ?? 0)}
              </StatValueText>
            </StatRoot>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(1, 1fr)" gap={4} mb={6}>
          <GridItem p={10} bg="blue.50" borderRadius="md">
            <StatRoot>
              <StatLabel textAlignLast={'center'}>Top Seller #1</StatLabel>
              <StatValueText justifyContent={'center'} m={3}>
                <Avatar src={stores?.logo_img || ''} />
                {stores?.name}
              </StatValueText>
            </StatRoot>
          </GridItem>
        </Grid>
      </Box>

      <Box>
        <Heading size="md" textAlign="center" mb={4}>
          Sales Chart
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dataTest}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box>
        <Heading size="md" textAlign="center" mb={4}>
          Sales Chart
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
