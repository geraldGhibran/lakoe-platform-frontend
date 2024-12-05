import {
  Box,
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Button,
  Input,
  Textarea,
  Stack,
  HStack,
  Text,
  DialogTrigger,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useRef } from 'react';
import MessageContent from './Message';
export default function Message() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Box>
      <Stack
        direction={'row'}
        w={'100%'}
        justifyContent={'space-between'}
        p={2}
      >
        <Text fontSize={'2xl'} fontWeight={'bold'} py={3}>
          Daftar Tamplate Pesan
        </Text>
        <DialogRoot initialFocusEl={() => ref.current}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              bgColor={'#0086B4'}
              borderRadius={'100px'}
              color={'white'}
            >
              Buat Tamplate
            </Button>
          </DialogTrigger>
          <DialogContent position={'fixed'}>
            <DialogHeader>
              <DialogTitle fontWeight={'bold'}>
                Buat template pesan baru
              </DialogTitle>
            </DialogHeader>
            <DialogBody pb="4">
              <Stack gap="4">
                <Field label="Judul Pesan" required>
                  <Input ref={ref} placeholder="Judul Pesan" />
                </Field>
                <Field label="Detail Isi Pesan" required>
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
                    placeholder="Detail Isi Pesan"
                    variant="outline"
                    h={'120px'}
                  />
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
              <Button
                variant="outline"
                bgColor={'#0086B4'}
                borderRadius={'100px'}
                color={'white'}
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Stack>
      <MessageContent />
    </Box>
  );
}
