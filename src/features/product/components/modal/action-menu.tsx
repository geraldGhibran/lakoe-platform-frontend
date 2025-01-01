import { Button } from '@/components/ui/button';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icon } from '@iconify/react';
import { Text, Box, HStack } from '@chakra-ui/react';
import DeleteConfirmMenu from './delete-menu';

interface Props {
  name: string;
}
export default function ActionMenu(props: Props) {
  const { name } = props;
  return (
    <Box>
      <PopoverRoot positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }}>
        <PopoverTrigger asChild>
          <Button
            rounded={'full'}
            bg={'white'}
            color={'black'}
            border={'1px solid black'}
          ></Button>
        </PopoverTrigger>
        <PopoverContent left={'80px'} width={'200px'} mt={2}>
          <PopoverBody>
            <HStack py={2}>
              <Icon icon="mage:edit" width={'20px'} height={'20px'} />
              <Text>Edit Produk</Text>
            </HStack>
            <HStack py={2}>
              <Icon icon="bi:copy" width={'20px'} height={'20px'} />
              <Text>Duplikat Produk</Text>
            </HStack>
            <DeleteConfirmMenu name={name} />
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </Box>
  );
}
