import { Box, Button, Flex } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import { BsHandbag } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';

export default function DetailProductPage() {
  return (
    <Box
      className="hide-scrollbar"
      overflowY="auto"
      color="black"
      bgColor="white"
      height="100vh"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="20px"
        height="80px"
        borderBottom="1px solid gainsboro"
      >
        <Link to="/">
          <Button
            color="black"
            _hover={{ bgColor: 'gainsboro' }}
            padding="10px"
            rounded="full"
            border="1px solid gainsboro"
          >
            SS
          </Button>
        </Link>
        <Flex alignItems="center" gap="10px" justify="center">
          <Link to="checkout">
            <Button _hover={{ bgColor: 'gainsboro' }} position="relative">
              <Box
                position="absolute"
                bgColor="#FF9800"
                boxSize="18px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                rounded="sm"
                fontSize="10px"
                top="-2"
                color="white"
                right="0"
              >
                1
              </Box>
              <BsHandbag />
            </Button>
          </Link>
          <Link to="">
            <Button _hover={{ bgColor: 'gainsboro' }} position="relative">
              <BsPerson />
            </Button>
          </Link>
        </Flex>
      </Box>
      <Outlet />
    </Box>
  );
}
