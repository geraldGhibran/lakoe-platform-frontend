import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import {
  addLocationSchema,
  AddLocationSchema,
} from '../schemas/addLocationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLocationStore } from '../services/store';
import { toaster } from '@/components/ui/toaster-placement';
import { useLocationStore } from '@/store/location';

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
  const [selectedPostalCodes, setSelectedPostalCodes] = useState<number | null>(
    null
  );
  const queryClient = useQueryClient();

  const { user } = useAuthStore();
  const { position } = useLocationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLocationSchema>({
    resolver: zodResolver(addLocationSchema),
    values: {
      storeId: user?.store?.id ?? 0,
      isMainLocation: false,
      name: '',
      address: '',
      cityDistrict: '',
      postalCode: 0,
      latitude: position.lat,
      longitude: position.lng,
      userId: user?.id ?? 0,
    },
  });

  const {
    mutateAsync: addLocationStoreAsync,
    isPending: isAddingLocationStore,
  } = useMutation({
    mutationKey: ['addLocationStore'],
    mutationFn: async (data: AddLocationSchema) => {
      return await addLocationStore(data);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['locationStore', user?.store?.id],
        exact: true,
      });

      toaster.create({
        title: 'Add new Location created',
        type: 'success',
        duration: 3000,
        description: 'Your New Locaion has been created successfully.',
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Error creating New Location',
        type: 'error',
        duration: 3000,
        description: error.message || 'An error occurred, please try again',
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    addLocationStoreAsync(data as AddLocationSchema);
  });

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
    register,
    errors,
    onSubmit,
    isAddingLocationStore,
    setSelectedPostalCodes,
    selectedPostalCodes,
  };
};
