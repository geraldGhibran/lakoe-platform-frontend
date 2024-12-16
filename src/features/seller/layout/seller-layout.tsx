import SideBar from '@/components/leftbar';
import { useAuthStore } from '@/store/auth';
import { Box, Flex } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AddSeller } from '../adds/add1';

export function SellerLayout() {
  const { user, token } = useAuthStore();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'SELLER') {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return (
    <Flex
      color="black"
      position="fixed"
      bgColor="#F8F8F8"
      height="100%"
      width="100%"
    >
      <Box overflow="hidden" width="1/3">
        <SideBar />
      </Box>

      <Box
        position="fixed"
        border="1px solid"
        borderColor="#E6E6E6"
        height="50px"
        width="100%"
        bgColor="white"
      ></Box>

      <Box
        mt="50px"
        zIndex="base"
        bgColor="#F4F4F5"
        pb="50px"
        padding="20px"
        className="hide-scrollbar"
        overflowY="auto"
        display="flex"
        height="90vh"
        width="full"
        flexDirection={'column'}
      >
        <Outlet />
      </Box>

      <Box width="1/3">
        <AddSeller />
      </Box>
    </Flex>
  );
}
