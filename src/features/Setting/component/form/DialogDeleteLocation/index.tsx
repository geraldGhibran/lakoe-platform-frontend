import { Button } from '@/components/ui/button';
import { useDeleteLocationStore } from '@/features/Setting/hooks/useDeleteLocation';
import {
  Box,
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRef } from 'react';
export default function DialogDeleteLocation({ id }: { id: number }) {
  const { onClose } = useDisclosure();
  const ref = useRef<HTMLInputElement>(null);
  const { onSubmit, isDeletingLocation, locationStore } =
    useDeleteLocationStore(Number(id));
  return (
    <Box>
      <DialogRoot initialFocusEl={() => ref.current}>
        <DialogTrigger asChild>
          <Icon icon="pajamas:remove" />
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle fontWeight={'bold'}>
                Hapus template pesan
              </DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
              <Stack gap="4">
                Apakah anda yakin hapus location dengan Judul{' '}
                {locationStore?.name} ??
              </Stack>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button
                  variant="outline"
                  bgColor={'white'}
                  borderRadius={'100px'}
                  color={'black'}
                >
                  Batalkan
                </Button>
              </DialogActionTrigger>
              <DialogActionTrigger asChild>
                <Button
                  loading={isDeletingLocation}
                  variant="outline"
                  bgColor={'red'}
                  borderRadius={'100px'}
                  color={'white'}
                  colorPalette={'red'}
                  type="submit"
                  onClick={
                    isDeletingLocation ? () => onClose() : () => onClose()
                  }
                >
                  Hapus
                </Button>
              </DialogActionTrigger>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
