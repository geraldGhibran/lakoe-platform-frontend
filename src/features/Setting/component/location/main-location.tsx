import { Box, Stack, Text } from '@chakra-ui/react';
import AddLocation from './add-location';
import { Icon } from '@iconify/react';
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
      <Box p={5} border={'1px solid #E6E6E6'} borderRadius={'10px'}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box></Box>
          <Stack direction={'row'}>
            <Box border={'1px solid #E6E6E6'} borderRadius={'50%'} p={2}>
              <Icon icon="bx:edit" />
            </Box>
            <Box border={'1px solid #E6E6E6'} borderRadius={'50%'} p={2}>
              <Icon icon="pajamas:remove" />
            </Box>
          </Stack>
        </Stack>
        <Box mt={'-40px'}>
          <Stack direction={'row'} justifyContent={'flex-start'} w={'100%'}>
            <Box py={1}>
              <Stack>
                <Box mr={20}>
                  <Text>Nama Lokasi</Text>
                  <Text>Alamat</Text>
                  <Text>Kota/Kecamatan</Text>
                  <Text>Kode Pos</Text>
                  <Text>Pinpoint</Text>
                </Box>
              </Stack>
            </Box>
            <Box>
              <Stack direction={'row'}>
                <Text fontWeight={'bold'}>Feysen Store</Text>
                <Text bgColor={'green'} color={'white'}>
                  Alamat Utama
                </Text>
              </Stack>
              <Text>Bandung, Jawa Barat, Indonesia</Text>
              <Text>Bandung</Text>
              <Text>40000</Text>
              <Stack direction={'row'} color={'blue'}>
                <Icon icon="fluent:location-16-filled" />
                <Text>Sudah Pinpoint</Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
