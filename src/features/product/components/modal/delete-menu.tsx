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
import { Text, HStack } from '@chakra-ui/react';

interface Props {
  name: string;
}

export default function DeleteConfirmMenu(props: Props) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <HStack py={2}>
          <Icon icon="pajamas:remove" width={'20px'} height={'20px'} />
          <Text>Hapus Produk</Text>
        </HStack>
      </DialogTrigger>
      <DialogContent top={'170px'} right={'250px'}>
        <DialogHeader>
          <DialogTitle> Hapus Produk?</DialogTitle>
        </DialogHeader>
        <DialogBody zIndex={10}>
          <Text mb={3}>Produk {props.name} akan dihapus</Text>
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
