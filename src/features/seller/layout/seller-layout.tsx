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
    <>
      <Box top={0} bg="white" zIndex={10} boxShadow="md" p={3} mb={4}></Box>
      <Flex bg={'gray.100'}>
        <Box flex={1}>
          <SideBar />
        </Box>
        <Box flex={3} m={4}>
          <Outlet />
        </Box>
        <Box flex={1}>
          <AddSeller />
        </Box>
      </Flex>
    </>
  );
}
