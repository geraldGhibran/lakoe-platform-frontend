import { StatRoot, StatValueText } from '@/components/ui/stat';
import { Box, Grid, GridItem, Heading, StatLabel } from '@chakra-ui/react';
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

export default function AdminHomePage() {
  const data = [
    { name: 'Jan', sales: 400 },
    { name: 'Feb', sales: 300 },
    { name: 'Mar', sales: 500 },
    { name: 'Apr', sales: 200 },
    { name: 'May', sales: 350 },
  ];
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
