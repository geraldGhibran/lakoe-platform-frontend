import {
  DialogFooter,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogActionTrigger,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, HStack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';

export default function DeleteRekening() {
  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger width="full" asChild>
          <Button
            _active={{ shadow: 'xs' }}
            shadow="sm"
            color="white"
            bgColor="red"
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <DialogTitle fontSize="md" fontWeight="bold">
              Apakah anda yakin?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogActionTrigger width="1/2">
              <Button
                width="full"
                border="1px solid gray"
                _hover={{ bgColor: 'gainsboro' }}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger width="1/2">
              <Button width="full" bgColor="red" color="white">
                Delete
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger
            _hover={{ bgColor: 'gainsboro' }}
            border="1px solid gray"
            color="gray"
          />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
