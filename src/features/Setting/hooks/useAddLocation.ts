import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  addLocationSchema,
  AddLocationSchema,
} from '../schemas/addLocationSchema';
import { addLocationStore } from '../services/store';

interface Provinsi {
  id: number;
  name: string;
}

interface Kabupaten {
  id: number;
  name: string;
}

interface Kecamatan {
  id: number;
  name: string;
}

interface Kelurahan {
  id: number;
  name: string;
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
  const [kecamatan, setKecamatan] = useState<Kecamatan[]>([]);
  const [kelurahan, setKelurahan] = useState<Kelurahan[]>([]);
  const [postalCodes, setPostalCodes] = useState<PostalCode[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<number | null>(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState<number | null>(
    null
  );
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );

  const [selectedKelurahan, setSelectedKelurahan] = useState<string | null>(
    null
  );
  const [selectedPostalCodes, setSelectedPostalCodes] = useState<number | null>(
    null
  );
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<AddLocationSchema>({
    resolver: zodResolver(addLocationSchema),
    values: {
      store_id: user?.store?.id ?? 0,
      is_main_location: true,
      name: '',
      address: '',
      city_district: '',
      city_district_code: 0,
      subdistrict: '',
      subdistrict_code: 0,
      province_code: 0,
      province: '',
      village: '',
      postal_code: 0,
      latitude: -6.520681934175305,
      longitude: 108.2208251953125,
      user_id: user?.id ?? 0,
    },
  });

  const [address, setAddress] = useState<string>('Loading address...');
  const markerRef = useRef<L.Marker<[number, number]>>(null);

  const position = {
    lat: watch('latitude', -6.2), // Default latitude
    lng: watch('longitude', 106.816666), // Default longitude
  };

  const updateAddress = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/reverse',
        {
          params: {
            lat: lat,
            lon: lng,
            format: 'json',
          },
        }
      );
      const data = response.data;
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
      setAddress('Error fetching address');
    }
  };

  const onMarkerDragEnd = () => {
    if (markerRef.current != null) {
      const newPos = markerRef.current.getLatLng();
      setValue('latitude', newPos.lat);
      setValue('longitude', newPos.lng);
      updateAddress(newPos.lat, newPos.lng);
    }
  };

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

      setIsOpen(false);
      reset();
    },
    onMutate: async () => {
      toaster.create({
        title: 'Template Message being created',
        type: 'Loading...',
        duration: 3000,
        description: 'Your template message is being created.',
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
    console.log(data);
    console.log(errors.name);
    addLocationStoreAsync(data as AddLocationSchema);
  });

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await axios.get(
          'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json'
        );
        const data = response.data || [];
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
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi}.json`
        );
        const data = response.data || [];
        setKabupaten(data);
      } catch (error) {
        console.error('Error fetching kabupaten:', error);
        setKabupaten([]);
      }
    };

    fetchKabupaten();
  }, [selectedProvinsi]);

  useEffect(() => {
    const fetchKecamatan = async () => {
      if (selectedKabupaten === null) {
        setKecamatan([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKabupaten}.json`
        );
        const data = response.data || [];
        setKecamatan(data);
      } catch (error) {
        console.error('Error fetching kabupaten:', error);
        setKecamatan([]);
      }
    };

    fetchKecamatan();
  }, [selectedKabupaten]);

  useEffect(() => {
    const fetchKelurahan = async () => {
      if (selectedKecamatan === null) {
        setKelurahan([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan}.json`
        );
        const data = response.data || [];
        setKelurahan(data);
      } catch (error) {
        console.error('Error fetching kabupaten:', error);
        setKelurahan([]);
      }
    };

    fetchKelurahan();
  }, [selectedKecamatan]);

  useEffect(() => {
    const fetchPostalCode = async () => {
      if (selectedKelurahan === null) {
        setPostalCodes([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://kodepos.vercel.app/search/?q=${selectedKelurahan}`
        );
        const data = response.data.data || [];
        setPostalCodes(data);
      } catch {
        setPostalCodes([]);
      }
    };

    fetchPostalCode();
  }, [selectedKelurahan]);

  return {
    provinsi,
    kecamatan,
    kelurahan,
    kabupaten,
    postalCodes,
    selectedProvinsi,
    setSelectedProvinsi,
    setSelectedKecamatan,
    setSelectedKelurahan,
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
    watch,
    setValue,
    isOpen,
    setIsOpen,
    address,
    onMarkerDragEnd,
    position,
    markerRef,
    control,
  };
};
