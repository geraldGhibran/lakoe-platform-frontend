import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Button, HStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useDeleteProduct } from '../../hooks/use-delete-product';

export default function DeleteProduct({ id }: { id: number }) {
  const { mutateAsync: deleteProductById, isPending } = useDeleteProduct();
  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger width="full" asChild>
          <Button
            _active={{ shadow: 'xs' }}
            _hover={{ bgColor: 'red.400' }}
            rounded="full"
            border="1px solid gray"
            bgColor={isPending ? 'red.400' : 'red'}
          >
            <Icon icon="pajamas:remove" width={'20px'} height={'20px'} />
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
                  backgroundColor="red"
                  padding="20px"
                  color="white"
                  onClick={() => deleteProductById(id)}
                >
                  Delete
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
