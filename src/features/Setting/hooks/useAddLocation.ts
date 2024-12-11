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

interface PostalCode {
  code: number;
}

function removeKotaKabupaten(city: string): string {
  const regex = /^(Kota|Kabupaten) /;
  return city.replace(regex, '');
}

export const useAddLocation = () => {
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [postalCodes, setPostalCodes] = useState<PostalCode[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<number | null>(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await axios.get(
          'https://dev.farizdotid.com/api/daerahindonesia/provinsi'
        );
        const data = response.data.provinsi || [];
        setProvinsi(data);
      } catch (error) {
        console.error('Error fetching provinsi:', error);
      }
    };

    fetchProvinsi();
  }, []);

  useEffect(() => {
    const fetchKabupaten = async () => {
      if (selectedProvinsi === null) {
        setKabupaten([]);
        return;
      }

      console.log(`Fetching kabupaten for provinsi ID: ${selectedProvinsi}`);
      try {
        const response = await axios.get(
          `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProvinsi}`
        );
        const data = response.data.kota_kabupaten || [];
        setKabupaten(data);
      } catch (error) {
        console.error('Error fetching kabupaten:', error);
        setKabupaten([]);
      }
    };

    fetchKabupaten();
  }, [selectedProvinsi]);

  useEffect(() => {
    const fetchPostalCode = async () => {
      if (selectedKabupaten === null) {
        setPostalCodes([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://kodepos.vercel.app/search/?q=${selectedKabupaten}`
        );
        const data = response.data.data || [];
        setPostalCodes(data);
      } catch (error) {
        console.error('Error fetching postal code:', error);
        setPostalCodes([]);
      }
    };

    fetchPostalCode();
  }, [selectedKabupaten]);

  return {
    provinsi,
    kabupaten,
    postalCodes,
    selectedProvinsi,
    setSelectedProvinsi,
    setPostalCodes,
    setKabupaten,
    setSelectedKabupaten,
    removeKotaKabupaten,
  };
};
