import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '@/components/ui/button';
import SideBar from '../leftbar';
import { Box } from '@chakra-ui/react';

export default function Hamburger() {
  return (
    <Box display={{ base: 'block', lg: 'none' }}>
      <DrawerRoot placement="start">
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button
            border="1px solid gray"
            size="sm"
            _hover={{ bgColor: 'gainsboro' }}
          >
            <GiHamburgerMenu />
          </Button>
        </DrawerTrigger>
        <DrawerContent bgColor="white" color="black">
          <DrawerBody overflow="hidden">
            <SideBar />
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
          <DrawerCloseTrigger
            border="1px solid gray"
            color="gray"
            _hover={{ bgColor: 'gainsboro' }}
          />
        </DrawerContent>
      </DrawerRoot>
    </Box>
  );
}
