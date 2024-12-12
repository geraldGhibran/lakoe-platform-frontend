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
import { Text } from '@chakra-ui/react';

interface Props {
  quantity: number;
}

export default function NonactiveConfirm(props: Props) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          bg={'white'}
          color={'black'}
          border={'1px solid #E6E6E6'}
          borderRadius={'full'}
          mx={4}
          fontWeight={'500'}
        >
          Nonaktifkan Produk
        </Button>
      </DialogTrigger>
      <DialogContent top={'200px'} right={'50px'}>
        <DialogHeader>
          <DialogTitle> Nonaktifkan {props.quantity} Produk</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>
            Produk yang dinonaktifkan tidak akan dapat dilihat oleh calon
            pembeli.Pastikan tindakan kamu benar.
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" borderRadius={'full'}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button bgColor={'blue.500'} borderRadius={'full'}>
            Ya,Nonaktifkan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
