import { Box, Stack, Text } from '@chakra-ui/react';
import AddLocation from './add-location';
export default function LocationMain() {
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
    </Box>
  );
}
