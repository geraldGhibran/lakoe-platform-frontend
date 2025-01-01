import { useAuthStore } from '@/store/auth';
import { Box, Stack, Text } from '@chakra-ui/react';
import { useGetLocationStore } from '../../hooks/useGetLocationStore';
import AddLocation from './add-location';
import ListLocation from './list-location';
export default function LocationMain() {
  const { user } = useAuthStore();

  const { data: locationStore } = useGetLocationStore(Number(user?.store?.id));

  return (
    <Box>
      <Stack
        direction={'row'}
        w={'100%'}
        justifyContent={'space-between'}
        p={2}
      >
        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'} py={3}>
            Lokasi Toko
          </Text>
          <Text color={'#9E9E9E'}>
            Alamat ini akan digunakan sebagai alamat pengirimanmu
          </Text>
        </Box>
        <AddLocation />
      </Stack>
      <ListLocation items={locationStore} />
    </Box>
  );
}
