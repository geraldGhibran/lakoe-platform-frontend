import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Button, HStack, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useWithdraw } from '../../hooks';
import { toaster } from '@/components/ui/toaster-placement';

export default function WithdrawSeller() {
  const [amount, setAmount] = useState<number | ''>('');
  const withdrawMutation = useWithdraw();

  const handleWithdraw = () => {
    if (!amount || amount < 5000) {
      toaster.create({
        title: 'Error',
        description: 'Minimal withdraw adalah Rp 5.000',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    withdrawMutation.mutate(Number(amount), {
      onSuccess: () => {
        toaster.create({
          title: 'Success',
          description: 'Withdraw request created successfully',
          type: 'success',
          duration: 3000,
        });
        setAmount('');
      },
      onError: (error: Error | string) => {
        toaster.create({
          title: 'Error',
          description: error.toString() || 'Something went wrong',
          type: 'error',
          duration: 3000,
        });
      },
    });
  };

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger width="full" asChild>
          <Button _active={{ shadow: 'xs' }} shadow="sm" bgColor="blue.500">
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <DialogTitle fontSize="md" fontWeight="bold">
              Withdraw
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            color="#464646"
            display="flex"
            flexDir="column"
            gap="20px"
          >
            <Text>*Minimal withdraw Rp 5.000</Text>
            <Input
              placeholder="Nominal"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              type="number"
            />
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
                  onClick={handleWithdraw}
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
