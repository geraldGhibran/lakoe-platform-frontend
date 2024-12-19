import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from '@/components/ui/timeline';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Box, HStack, Text } from '@chakra-ui/react';

const TrackingModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Text color={'cyan.500'} fontWeight={500} fontSize={'sm'}>
          Lacak Pengiriman
        </Text>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lacak Pengiriman</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
            <Box p={5}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Kurir
              </Text>
              <Text fontSize={'sm'} fontWeight={500}>
                JNE - Reguler
              </Text>
              <HStack>
                <Text fontSize={'sm'} color={'gray.500'} pt={2}>
                  No.Resi
                </Text>
                <Icon icon="iconoir:copy" />
              </HStack>
              <Text fontSize={'sm'} fontWeight={500}>
                657657575756
              </Text>
              <Text fontSize={'sm'} color={'gray.500'} pt={2}>
                Pengirim
              </Text>
              <Text fontSize={'sm'} fontWeight={500}>
                Bakulan Store
              </Text>
            </Box>
            <Box p={5}>
              <Text fontSize={'sm'} color={'gray.500'} pt={2}>
                Penerima
              </Text>
              <Text fontSize={'sm'} fontWeight={500}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                quisquam recusandae officiis aliquam.
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Text>Status :</Text>
            <Text fontWeight={500}>Dalam Proses Pengiriman</Text>
          </HStack>
          <Box border={'1px solid #E6E6E6'} rounded={'md'} p={10} my={2}>
            <TimelineRoot maxW="400px">
              <TimelineItem>
                <TimelineConnector bgColor={'cyan.100'}>
                  <Box
                    borderRadius={'full'}
                    bgColor={'cyan.500'}
                    width={'10px'}
                    height={'10px'}
                  ></Box>
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle>Pesanan Diproses</TimelineTitle>
                  <TimelineDescription>13th May 2021</TimelineDescription>
                  <Text textStyle="sm">
                    We shipped your product via <strong>FedEx</strong> and it
                    should arrive within 3-5 business days.
                  </Text>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineConnector bgColor={'gray.100'}>
                  <Box
                    borderRadius={'full'}
                    bgColor={'gray.300'}
                    width={'10px'}
                    height={'10px'}
                  ></Box>
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle textStyle="sm">
                    Pembayaran Terverifikasi
                  </TimelineTitle>
                  <TimelineDescription>18th May 2021</TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineConnector bgColor={'gray.100'}>
                  <Box
                    borderRadius={'full'}
                    bgColor={'gray.300'}
                    width={'10px'}
                    height={'10px'}
                  ></Box>
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle textStyle="sm">Pesanan Dibuat</TimelineTitle>
                  <TimelineDescription>
                    20th May 2021, 10:30am
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            </TimelineRoot>
          </Box>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default TrackingModal;
