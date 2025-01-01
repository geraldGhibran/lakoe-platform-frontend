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
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRef } from 'react';
export default function DialogDeleteLocation({ id }: { id: number }) {
  const ref = useRef<HTMLInputElement>(null);
  const { onSubmit, isDeletingLocation, locationStore, isOpen, setIsOpen } =
    useDeleteLocationStore(Number(id));
  return (
    <Box>
      <DialogRoot
        open={isOpen}
        lazyMount
        initialFocusEl={() => ref.current}
        size="lg"
        scrollBehavior="outside"
      >
        <DialogTrigger asChild>
          <Icon icon="pajamas:remove" onClick={() => setIsOpen(!isOpen)} />
        </DialogTrigger>
        <DialogContent position="absolute" zIndex={1} top="25%" left="25%">
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
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Batalkan
                </Button>
              </DialogActionTrigger>
              <Button
                loading={isDeletingLocation}
                variant="outline"
                bgColor={'red'}
                borderRadius={'100px'}
                color={'white'}
                colorPalette={'red'}
                type="submit"
              >
                Hapus
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
