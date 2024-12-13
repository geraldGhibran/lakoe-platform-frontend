import { Input } from '@chakra-ui/react';
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
import { Field } from '@/components/ui/field';
import { useRef } from 'react';
import { Text } from '@chakra-ui/react';

interface Props {
  name: string;
}

const ChangeStock = (props: Props) => {
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
          Ubah Stok
        </Button>
      </DialogTrigger>
      <DialogContent top={10}>
        <DialogHeader>
          <DialogTitle>Ubah Stok</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text py={3}>Ubah stok untuk produk {props.name}</Text>
          <Field>
            <Input placeholder="Masukan stok" />
          </Field>
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

export default ChangeStock;
