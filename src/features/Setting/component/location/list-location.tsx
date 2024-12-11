import { Location } from '@/types/locations';
import { Box, Stack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
export default function ListLocation({ items }: { items: Location[] }) {
  return (
    <>
      {items?.map((item, index) => (
        <Box
          p={5}
          key={index}
          border={'1px solid #E6E6E6'}
          borderRadius={'10px'}
        >
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
                    <Text>Kode Pos</Text>
                    <Text>Pinpoint</Text>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Stack direction={'row'}>
                  <Text fontWeight={'bold'}>{item?.name}</Text>
                  {item?.is_main_location && (
                    <Text bgColor={'green'} color={'white'}>
                      Alamat Utama
                    </Text>
                  )}
                </Stack>
                <Text>{item?.address}</Text>
                <Text>{item?.postal_code}</Text>
                <Stack direction={'row'} color={'blue'}>
                  <Icon icon="fluent:location-16-filled" />
                  <Text>Sudah Pinpoint</Text>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      ))}
    </>
  );
}
