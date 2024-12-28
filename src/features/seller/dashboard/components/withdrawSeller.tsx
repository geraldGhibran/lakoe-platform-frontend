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
import { Box, Button, HStack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';

export default function WithdrawSeller() {
  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger width="full" asChild>
          <Button _active={{ shadow: 'xs' }} shadow="sm" bgColor="yellow.300">
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <DialogTitle fontSize="md" fontWeight="bold">
              Tandai Pinpoint
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            color="#464646"
            display="flex"
            flexDir="column"
            gap="20px"
          >
            ada
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
                Kembali
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Box width="1/2">
                <Button
                  width="full"
                  padding="20px"
                  color="white"
                  bgColor="#2E4399"
                  type="submit"
                >
                  Oke
                </Button>
              </Box>
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
