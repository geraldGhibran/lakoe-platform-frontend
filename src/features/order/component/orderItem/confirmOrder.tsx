import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Button, HStack, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { useAcceptPaid } from '../../hooks/use-get-invoices';

export default function ConfirmOrder({
  display,
  text,
  id,
}: {
  text: string;
  id: number | undefined;
  display: string;
}) {
  const { mutateAsync: acceptPaid } = useAcceptPaid();
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
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button
                _hover={{ bgColor: 'gainsboro' }}
                width="1/2"
                border="1px solid gray"
                color="gray"
                padding="20px"
                variant="outline"
              >
                Batal
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Box width="1/2">
                <Button
                  width="full"
                  padding="20px"
                  color="white"
                  bgColor="#2E4399"
                  onClick={() => acceptPaid(id)}
                >
                  Proses
                </Button>
              </Box>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger
            color="gray"
            border="1px solid gray"
            _hover={{ bgColor: 'gainsboro' }}
          />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
