import { Box, Stack, TextProps } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { ReactNode } from 'react';

interface NotFoundCardProps extends TextProps {
  children?: ReactNode;
}
function NotFoundCard({ children, ...Props }: NotFoundCardProps) {
  return (
    <>
      <Stack
        display={'flex'}
        direction={'column'}
        gap={5}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={3}
      >
        <Stack
          display={'flex'}
          direction={'row'}
          border={'1px solid #E6E6E6'}
          p={5}
          rounded={'sm'}
          width={'100%'}
          justifyContent={'center'}
        >
          <Stack
            display={'flex'}
            direction={'row'}
            gap={2}
            alignItems={'center'}
          >
            <Icon
              icon={'ant-design:search-outlined'}
              color="black"
              width={'40px'}
            />
            <Box>
              {children && <Box {...Props}>{children}</Box>}
              {/* <Text>Oops, produk yang kamu cari tidak ditemukan</Text>
              <Text>Coba kata kunci lain atau tambahkan produk baru</Text> */}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default NotFoundCard;
