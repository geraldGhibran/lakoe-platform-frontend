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
import { useAccountStore } from '@/store/rekId';
import { toaster } from '@/components/ui/toaster-placement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from '@/libs/axios';

export default function DeleteRekening() {
  const rekId = useAccountStore((state) => state.accountId);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!rekId) throw new Error('Rekening ID tidak ditemukan');
      await API.delete(`/bank/${rekId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rekAccount'] });
      toaster.create({
        title: 'Rekening Deleted',
        type: 'success',
        duration: 3000,
        description: 'Your rekening has been deleted successfully.',
      });
    },
    onError: (error) => {
      console.error('Error deleting rekening:', error);
      toaster.create({
        title: 'Delete Failed',
        type: 'error',
        duration: 3000,
        description: 'Failed to delete rekening. Please try again.',
      });
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

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
              <Button
                width="full"
                bgColor="red"
                color="white"
                onClick={handleDelete}
              >
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
