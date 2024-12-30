import { ColorModeButton } from '@/components/ui/color-mode';
import { useCartStore } from '@/store/cart-store';
import '@/styles/styes.css';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsHandbag } from 'react-icons/bs';
import { Link, Outlet } from 'react-router-dom';

export default function DetailProductPage() {
  const {
    quantityCart,
    setTotalQuantityCart,
    increaseQuantity,
    decreaseQuantity,
    quantity,
  } = useCartStore();

  useEffect(() => {
    setTotalQuantityCart();
  }, [
    setTotalQuantityCart,
    quantityCart,
    increaseQuantity,
    decreaseQuantity,
    quantity,
  ]);

  return (
    <Box
      className="hide-scrollbar"
      overflow="hidden"
      height="100vh"
      color="black"
      bgColor="white"
    >
      <Box
        display="flex"
        position="sticky"
        bgColor="white"
        width="100vw"
        zIndex="max"
        top="0"
        justifyContent="space-between"
        alignItems="center"
        px="20px"
        height="10%"
        borderBottom="1px solid gainsboro"
      >
        <Link to="/products">
          <Button
            color="black"
            _hover={{ bgColor: 'gainsboro' }}
            padding="10px"
            bgColor="white"
          >
            {/* <IoIosArrowBack /> All Products */}
          </Button>
        </Link>
        <Flex alignItems="center" gap="10px" justify="center">
          <Link to="cart">
            <Button
              bgColor="white"
              color="black"
              _hover={{ bgColor: 'gainsboro' }}
              position="relative"
            >
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
                {quantityCart}
              </Box>
              <BsHandbag />
            </Button>
          </Link>
          {/* <Link to=""> */}
          <ColorModeButton />
          {/* </Link> */}
        </Flex>
      </Box>
      <Box className="hide-scrollbar" height="85vh" overflowY="auto">
        <Outlet />
      </Box>
    </Box>
  );
}
