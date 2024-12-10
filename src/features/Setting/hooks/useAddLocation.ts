import { useState, useEffect } from 'react';
import axios from 'axios';

interface Provinsi {
  id: number;
  nama: string;
}

interface Kabupaten {
  id: number;
  nama: string;
}

export const useAddLocation = () => {
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
      .then((response) => {
        const data = response.data.provinsi || [];
        setProvinsi(data);
      })
      .catch((error) => {
        console.error('Error fetching provinsi:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvinsi === null) {
      setKabupaten([]);
      return;
    }

    console.log(`Fetching kabupaten for provinsi ID: ${selectedProvinsi}`);
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProvinsi}`
      )
      .then((response) => {
        const data = response.data.kota_kabupaten || [];
        setKabupaten(data);
      })
      .catch((error) => {
        console.error('Error fetching kabupaten:', error);
        setKabupaten([]);
      });
  }, [selectedProvinsi]);

  const postalCode = [
    { label: '10110', value: '10110' },
    { label: '14230', value: '14230' },
    { label: '11510', value: '11510' },
    { label: '12520', value: '12520' },
    { label: '13410', value: '13410' },
  ];

  return {
    provinsi,
    kabupaten,
    postalCode,
    selectedProvinsi,
    setSelectedProvinsi,
  };
};
