import { Button } from '@/components/ui/button';
import { useDeleteTemplateMessage } from '@/features/Setting/hooks/useDeleteTemplateMessage';
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
  Input,
  Stack,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
export default function DialogDeleteTemplateMessage({ id }: { id: number }) {
  const ref = useRef<HTMLInputElement>(null);
  const {
    setIsOpen,
    isOpen,
    onSubmit,
    control,
    isDeletingTemplateMessage,
    templateMessage,
  } = useDeleteTemplateMessage(Number(id));
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
        <DialogContent position="absolute" zIndex={1} top="-5%" left="15%">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle fontWeight={'bold'}>
                Hapus template pesan
              </DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
              <Stack gap="4">
                <Controller
                  name="id"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border="2px solid black"
                      placeholder="Store ID"
                      type="number"
                      value={Number(templateMessage?.id)}
                      hidden
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  )}
                />
                Apakah anda yakin hapus pesan dengan Judul
                {templateMessage?.title} ??
              </Stack>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button
                  variant="outline"
                  bgColor={'white'}
                  borderRadius={'100px'}
                  color={'black'}
                  onClick={() => setIsOpen(false)}
                >
                  Batalkan
                </Button>
              </DialogActionTrigger>
              <Button
                loading={isDeletingTemplateMessage}
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
