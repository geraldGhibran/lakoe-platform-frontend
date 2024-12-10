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
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
export default function DialogDeleteTemplateMessage({ id }: { id: number }) {
  const { onClose } = useDisclosure();
  const ref = useRef<HTMLInputElement>(null);
  const { onSubmit, control, isDeletingTemplateMessage, templateMessage } =
    useDeleteTemplateMessage(Number(id));
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
                >
                  Batalkan
                </Button>
              </DialogActionTrigger>
              <DialogActionTrigger asChild>
                <Button
                  loading={isDeletingTemplateMessage}
                  variant="outline"
                  bgColor={'red'}
                  borderRadius={'100px'}
                  color={'white'}
                  colorPalette={'red'}
                  type="submit"
                  onClick={
                    isDeletingTemplateMessage
                      ? () => onClose()
                      : () => onClose()
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
