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
  village: string;
  district: string;
  regency: string;
}

export const useAddLocation = () => {
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [kabupaten, setKabupaten] = useState<Kabupaten[]>([]);
  const [postalCodes, setPostalCodes] = useState<PostalCode[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<number | null>(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState<number | null>(
    null
  );

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
  useEffect(() => {
    if (selectedKabupaten === null) {
      console.log('No Kabupaten selected, skipping postal codes fetch');
      return;
    }

    const selectedKabupatenName = kabupaten.find(
      (kab) => kab.id === selectedKabupaten
    )?.nama;

    if (!selectedKabupatenName) {
      console.log('Kabupaten name not found, skipping postal codes fetch');
      return;
    }

    axios
      .get(`https://kodepos.vercel.app/search/?q=${selectedKabupatenName}`)
      .then((response) => {
        setPostalCodes(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching postal codes:', error);
      });
  }, [selectedKabupaten, kabupaten]);

  return {
    provinsi,
    kabupaten,
    postalCodes,
    selectedProvinsi,
    setSelectedProvinsi,
    selectedKabupaten,
    setSelectedKabupaten,
  };
};
