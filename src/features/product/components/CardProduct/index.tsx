import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Box, Button, Stack, Text } from '@chakra-ui/react';

export default function CardProduct() {
  return (
    <>
      <Stack
        display={'flex'}
        direction={'column'}
        gap={5}
        justifyContent={'space-between'}
        marginTop={3}
      >
        <Stack
          display={'flex'}
          direction={'row'}
          border={'1px solid #E6E6E6'}
          p={5}
          justifyContent={'space-between'}
        >
          <Box>
            <img
              src="../../../../public/cardImage/Rectangle 40352.png"
              alt="product-image"
            />
          </Box>
          <Box flex={2}>
            <Text>
              KAOS BASIC COTTON KENARI - DUSTY ROSE [ COTTON COMBED 30S ]
            </Text>
            <Box display={'flex'} direction={'row'} gap={2}>
              <Text>Rp. harga . </Text>
              <Text>Stock: 20 . </Text>
              <Text>SKU: 0219AKD192</Text>
            </Box>
            <Box display={'flex'} direction={'row'} gap={2} marginY={2}>
              <Button rounded={'full'}>Ubah Harga</Button>
              <Button rounded={'full'}>Ubah Stok</Button>
              <Button rounded={'full'}>Lihat Halaman</Button>
              <Button rounded={'full'}>...</Button>
            </Box>
          </Box>
          <Stack
            display={'flex'}
            direction={'column'}
            justifyContent={'space-between'}
            gap={2}
          >
            <Checkbox></Checkbox>
            <Switch size={'lg'} colorPalette={'blue'} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
