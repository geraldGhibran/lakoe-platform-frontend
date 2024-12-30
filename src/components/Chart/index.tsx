import { useSellerData } from '@/features/seller/hooks';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyChart: React.FC = () => {
  const { data: sellerData, isLoading, error } = useSellerData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const invoiceStatusCounts = sellerData?.invoices.reduce(
    (acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const data = {
    labels: Object.keys(invoiceStatusCounts ?? {}),
    datasets: [
      {
        label: 'Jumlah Status',
        data: Object.values(invoiceStatusCounts ?? {}),
        backgroundColor: '#3B82F6',
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
        text: 'Invoices',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MyChart;
