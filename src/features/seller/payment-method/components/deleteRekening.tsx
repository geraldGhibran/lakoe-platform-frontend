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
import API from '@/libs/axios';
import { Button, HStack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { useAccountStore } from '@/store/rekId';
import { toaster } from '@/components/ui/toaster-placement';

export default function DeleteRekening() {
  const rekId = useAccountStore((state) => state.accountId);
  const handleDelete = async () => {
    if (!rekId) {
      alert('Rekening ID tidak ditemukan');
      return;
    }

    try {
      await API.delete(`/bank/${rekId}`);
      toaster.create({
        title: 'rekening Message deleted',
        type: 'success',
        duration: 3000,
        description: 'Your rekening has been deleted successfully.',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting rekening:', error);
      alert('Gagal menghapus rekening.');
    }
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
                onClick={() => handleDelete()}
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
