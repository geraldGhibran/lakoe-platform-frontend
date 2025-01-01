import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetTemplateMessage } from '@/features/Setting/hooks/useGetTemplateMessage';
import { useAuthStore } from '@/store/auth';
import { Store } from '@/types/store';
import { Button, HStack, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import MessageToWhatsapp from './message-to-whatsapp';
// import { Product } from '@/types/product';

interface Product {
  name: string;
}

export default function ContactBuyer({
  display,
  text,
  receiver_phone,
  receiver_name,
  Product,
  store,
}: {
  text: string;
  receiver_phone: string;
  display: string;
  receiver_name: string;
  Product: Product[];
  store: Store;
}) {
  // const { mutateAsync: acceptPaid } = useAcceptPaid();
  const { user } = useAuthStore();
  const { data: templateMessage } = useGetTemplateMessage(
    Number(user?.store?.id)
  );

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button
            display={display}
            _hover={{ bgColor: 'gainsboro' }}
            borderRadius={'100px'}
            bg={'white'}
            color={'black'}
            border={'1px solid black'}
          >
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogBody>
            <Text mt="20px" fontSize="20px">
              Apakah anda ingin memproses pesanan ini?
            </Text>
            <MessageToWhatsapp
              receiver_phone={receiver_phone}
              items={templateMessage}
              receiver_name={receiver_name}
              Product={Product}
              store={store}
            />
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger
              color="gray"
              border="1px solid gray"
              _hover={{ bgColor: 'gainsboro' }}
            />
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
