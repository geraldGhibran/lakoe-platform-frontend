import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { useGetInvoicesId } from '../../hooks/use-get-invoices-id';
import TrackingLayout from './tracking-layout';

const TrackingModal = () => {
  const { data } = useGetInvoicesId();
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
                {data?.invoice?.Courier?.courier_code} - Reguler
              </Text>
              <HStack>
                <Text fontSize={'sm'} color={'gray.500'} pt={2}>
                  No.Resi
                </Text>
                <Icon icon="iconoir:copy" />
              </HStack>
              <Text fontSize={'sm'} fontWeight={500}>
                {data?.invoice?.Courier?.resi}
              </Text>
              <Text fontSize={'sm'} color={'gray.500'} pt={2}>
                Pengirim
              </Text>
              <Text fontSize={'sm'} fontWeight={500}>
                {data?.invoice?.store?.name}
              </Text>
            </Box>
            <Box p={5}>
              <Text fontSize={'sm'} color={'gray.500'} pt={2}>
                Penerima
              </Text>
              <Text fontSize={'sm'} fontWeight={500}>
                {data?.invoice.receiver_name}
              </Text>
              <Text fontSize={'sm'} color={'gray'}>
                {data?.invoice?.receiver_address}
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Text>Status :</Text>
            <Text fontWeight={500}>{data?.invoice?.status}</Text>
          </HStack>
          <TrackingLayout />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default TrackingModal;
