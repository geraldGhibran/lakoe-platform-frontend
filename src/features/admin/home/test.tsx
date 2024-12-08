import { Heading } from '@chakra-ui/react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function TestAdmin() {
  const data = [
    { name: 'Jan', sales: 400 },
    { name: 'Feb', sales: 300 },
    { name: 'Mar', sales: 500 },
    { name: 'Apr', sales: 200 },
    { name: 'May', sales: 350 },
  ];
  return (
    <>
      {/* <Box
        maxW="600px"
        mx="auto"
        mt={5}
        p={4}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="sm"
      > */}
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
      {/* </Box> */}
    </>
  );
}
