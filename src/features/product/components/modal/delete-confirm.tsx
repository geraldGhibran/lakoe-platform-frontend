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
import { Icon } from '@iconify/react';
import { Text } from '@chakra-ui/react';

interface Props {
  quantity: number;
}

export default function DeleteConfirm(props: Props) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Icon icon="pajamas:remove" width={'20px'} height={'20px'} />
      </DialogTrigger>
      <DialogContent top={'200px'} right={'50px'}>
        <DialogHeader>
          <DialogTitle> Hapus {props.quantity} Produk</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>
            Produk yang dihapus tidak akan bisa dibatalkan.Pastikan produk yang
            kamu pilih itu sudah benar.
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" borderRadius={'full'}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button bgColor={'blue.500'} borderRadius={'full'}>
            Ya,Hapus
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
