import { Button } from '@/components/ui/button';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icon } from '@iconify/react';
import { Text, Flex, Box } from '@chakra-ui/react';

type DeleteVariantProps = {
  variantName: string;
  onDelete: (variantName: string) => void;
};

const DeleteVariant = ({ variantName, onDelete }: DeleteVariantProps) => {
  return (
    <PopoverRoot positioning={{ placement: 'bottom-end' }}>
      <PopoverTrigger asChild>
        <Button
          bg={'white'}
          color={'black'}
          border={'1px solid black'}
          borderRadius={'100px'}
          my={2}
        >
          <Icon icon="mynaui:trash" />
          Hapus {variantName}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text>Apakah Anda yakin ingin menghapus varian ini?</Text>
          <Flex justify="space-between" mt={4}>
            <Box></Box>
            <Button onClick={() => onDelete(variantName)}>Hapus</Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default DeleteVariant;
