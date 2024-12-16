import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { useEditTemplateMessageById } from '@/features/Setting/hooks/useEditTemplateMessageByid';
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
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRef } from 'react';
export default function DialogEditTemplateMessage({ id }: { id: number }) {
  const ref = useRef<HTMLInputElement>(null);
  const {
    isOpen,
    setIsOpen,
    onSubmit,
    errors,
    register,
    isEditingTemplateMessage,
  } = useEditTemplateMessageById(Number(id));
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
          <Icon icon="bx:edit" onClick={() => setIsOpen(!isOpen)} />
        </DialogTrigger>
        <DialogContent position="absolute" zIndex={1} top="-5%" left="15%">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle fontWeight={'bold'}>
                Buat template pesan baru
              </DialogTitle>
            </DialogHeader>
            <DialogBody pb="4" mx={'auto'}>
              <Stack gap="1">
                <Input
                  {...register('id')}
                  border="2px solid black"
                  placeholder="ID"
                  type="number"
                  value={Number(id)}
                  hidden
                />

                <Field label="Judul Pesan">
                  <Input
                    {...register('title')}
                    border="2px solid black"
                    placeholder="Judul Pesan"
                  />
                  {errors.title && (
                    <Text color={'red.500'}>
                      {errors.title.message as string}
                    </Text>
                  )}
                </Field>
                <Field label="Detail Isi Pesan">
                  <HStack>
                    <Text
                      border={'1px solid #E6E6E6'}
                      p={1}
                      borderRadius={'100px'}
                    >
                      Nama Customer
                    </Text>
                    <Text
                      border={'1px solid #E6E6E6'}
                      p={1}
                      borderRadius={'100px'}
                    >
                      Nama Produk
                    </Text>
                    <Text
                      border={'1px solid #E6E6E6'}
                      p={1}
                      borderRadius={'100px'}
                    >
                      Nama Toko
                    </Text>
                  </HStack>
                  <Textarea
                    {...register('message')}
                    placeholder="Detail Isi Pesan"
                    variant="outline"
                    h={'120px'}
                  />
                  {errors.message && (
                    <Text color={'red.500'}>
                      {errors.message.message as string}
                    </Text>
                  )}
                </Field>
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
                loading={isEditingTemplateMessage}
                variant="outline"
                bgColor={'#0086B4'}
                borderRadius={'100px'}
                color={'white'}
                type="submit"
              >
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
