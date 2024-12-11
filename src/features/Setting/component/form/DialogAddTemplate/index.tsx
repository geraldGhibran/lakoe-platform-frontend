import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { useAddTemplateMessage } from '@/features/Setting/hooks/useAddTemplateMessage';
import {
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
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
export default function DialogAddTemplate() {
  const { onClose } = useDisclosure();
  const ref = useRef<HTMLInputElement>(null);
  const { onSubmit, control, errors, isCreatingTemplateMessage } =
    useAddTemplateMessage();
  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          bgColor={'#0086B4'}
          borderRadius={'100px'}
          color={'white'}
        >
          Buat Template
        </Button>
      </DialogTrigger>
      <DialogContent position={'fixed'}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle fontWeight={'bold'}>
              Buat template pesan baru
            </DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Controller
                name="storeId"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    {...fieldState}
                    border="2px solid black"
                    placeholder="Store ID"
                    type="number"
                    hidden
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  />
                )}
              />

              <Field label="Judul Pesan">
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border="2px solid black"
                      placeholder="Judul Pesan"
                    />
                  )}
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
                <Controller
                  name="message"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Textarea
                      {...field}
                      {...fieldState}
                      placeholder="Detail Isi Pesan"
                      variant="outline"
                      h={'120px'}
                    />
                  )}
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
              >
                Batalkan
              </Button>
            </DialogActionTrigger>

            <DialogActionTrigger asChild>
              <Button
                loading={isCreatingTemplateMessage}
                variant="outline"
                bgColor={'#0086B4'}
                borderRadius={'100px'}
                color={'white'}
                type="submit"
                onClick={isCreatingTemplateMessage ? () => {} : () => onClose()}
              >
                Simpan
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
