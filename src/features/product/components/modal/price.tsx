import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRef } from 'react';
import { Text } from '@chakra-ui/react';
import { Group, Input, InputAddon, Stack } from '@chakra-ui/react';

interface Props {
  name: string;
}

const ChangePrice = (props: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Button
          rounded={'full'}
          bg={'white'}
          color={'black'}
          border={'1px solid black'}
        >
          Ubah Harga
        </Button>
      </DialogTrigger>
      <DialogContent top={10}>
        <DialogHeader>
          <DialogTitle>Ubah Harga</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text py={3}>Ubah harga untuk produk {props.name}</Text>
          <Stack gap="10">
            <Group attached>
              <InputAddon>Rp</InputAddon>
              <Input placeholder="Masukan Harga" />
            </Group>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" borderRadius={'full'}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button borderRadius={'full'} bg={'blue.500'}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ChangePrice;
