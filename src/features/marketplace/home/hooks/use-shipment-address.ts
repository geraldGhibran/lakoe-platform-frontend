import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  shipmentAddressSchema,
  ShipmentAddressSchema,
} from '../schemas/ShipmentAddressSchema';

interface Provinsi {
  id: number;
  nama: string;
}

interface Kabupaten {
  id: number;
  nama: string;
}

interface Kecamatan {
  id: number;
  nama: string;
}

interface Kelurahan {
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

export const useShipmentAddress = () => {
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
  } = useForm<ShipmentAddressSchema>({
    resolver: zodResolver(shipmentAddressSchema),
    values: {
      name: '',
      phone: 0,
      address: '',
      city_district: '',
      subdistrict: '',
      province: '',
      village: '',
      postal_code: 0,
      latitude: -6.520681934175305,
      longitude: 108.2208251953125,
    },
  });

  const [address, setAddress] = useState<string>('Loading address...');
  const markerRef = useRef<L.Marker<[number, number]>>(null);

  const position = {
    lat: watch('latitude', -6.2),
    lng: watch('longitude', 106.816666),
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
    mutateAsync: shipmentPaymentAsync,
    isPending: isAddingLocationStore,
  } = useMutation({
    mutationKey: ['shipmentAddress'],
    mutationFn: async (data: ShipmentAddressSchema) => {
      return await console.log(data);
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
    shipmentPaymentAsync(data as ShipmentAddressSchema);
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
    const fetchKecamatan = async () => {
      if (selectedKabupaten === null) {
        setKecamatan([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${selectedKabupaten}`
        );
        const data = response.data.kecamatan || [];
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
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${selectedKecamatan}`
        );
        const data = response.data.kelurahan || [];
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
