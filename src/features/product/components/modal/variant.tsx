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
import { Icon } from '@iconify/react';

export default function VariantModal() {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          borderRadius={'full'}
          bgColor={'#0086B4'}
          color={'white'}
        >
          <Icon icon="ep:list" />
          Atur Sekaligus
        </Button>
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
            <Box width="full">
              <Box fontWeight={'600'} pb={1}>
                Harga
              </Box>
              <Group width="full" attached>
                <InputAddon>Rp</InputAddon>
                <Input
                  width="full"
                  placeholder="masukan harga satuan barang"
                  w={'full'}
                />
              </Group>
            </Box>
            <Box width="full">
              <Field label="Nama produk">
                <Input placeholder="masukan nama produk" w={'full'} />
              </Field>
            </Box>
          </HStack>
          <HStack gap={5} mt={5}>
            <Box width="full">
              <Field label="SKU (Stock Keeping Unit)">
                <Input placeholder="masukan SKU" w={'full'} />
              </Field>
            </Box>
            <Box width="full">
              <Box fontWeight={'full'} pb={1}>
                Berat
              </Box>
              <Group width="full" attached>
                <Input placeholder="masukan nama produk" w={'full'} />
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
