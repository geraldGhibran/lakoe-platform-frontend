import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const salesData = [
  { month: 'January', sales: 12000 },
  { month: 'February', sales: 19000 },
  { month: 'March', sales: 3000 },
  { month: 'April', sales: 5000 },
  { month: 'May', sales: 2000 },
  { month: 'June', sales: 30000 },
];

const MyChart: React.FC = () => {
  const data = {
    labels: salesData.map((item) => item.month),
    datasets: [
      {
        label: 'Sales',
        data: salesData.map((item) => item.sales),
        backgroundColor: '#FDE047',
        borderColor: 'red',
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MyChart;
