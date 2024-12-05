import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Group, HStack, Input, InputAddon } from '@chakra-ui/react';
import { useState } from 'react';
import { Field } from '@/components/ui/field';

export default function VariantModal() {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent minWidth={'50%'}>
        <DialogHeader>
          <DialogTitle>Pilih Variant yang ingin diatur</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Button
            variant="outline"
            p={5}
            borderRadius={'100px'}
            bg={'#C5F8FF'}
            border={'2px solid #0086B4'}
          >
            Pilih Semua Variant
          </Button>
          <HStack gap={5} mt={5}>
            <Box>
              <Box fontWeight={'600'} pb={1}>
                Harga
              </Box>
              <Group attached>
                <InputAddon>Rp</InputAddon>
                <Input placeholder="masukan harga satuan barang" w={'400px'} />
              </Group>
            </Box>
            <Box>
              <Field label="Nama produk">
                <Input placeholder="masukan nama produk" w={'335px'} />
              </Field>
            </Box>
          </HStack>
          <HStack gap={5} mt={5}>
            <Box>
              <Field label="SKU (Stock Keeping Unit)">
                <Input placeholder="masukan SKU" w={'440px'} />
              </Field>
            </Box>
            <Box>
              <Box fontWeight={'600'} pb={1}>
                Berat
              </Box>
              <Group attached>
                <Input placeholder="masukan nama produk" w={'280px'} />
                <InputAddon>gram</InputAddon>
              </Group>
            </Box>
          </HStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant={'outline'} borderRadius={'100px'}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button borderRadius={'100px'} bgColor={'#0086B4'}>
            Terapkan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
