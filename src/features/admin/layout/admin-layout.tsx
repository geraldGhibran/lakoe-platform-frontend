import { useAuthStore } from '@/store/auth';
import { Box, Flex } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Adds } from '../adds/adds';
import LeftBarAdmin from '../nav/leftbar-admin';

export function AdminLayout() {
  const { user, token } = useAuthStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return (
    <>
      <Box
        h={'2vh'}
        top={0}
        bg="white"
        zIndex={10}
        boxShadow="md"
        p={3}
        mb={4}
      ></Box>
      <Flex h={'95vh'} bg={'gray.100'}>
        <Box flex={1} position={'sticky'}>
          <LeftBarAdmin />
        </Box>
        <Box
          flex={3}
          m={4}
          zIndex="base"
          bgColor="#F4F4F5"
          pb="50px"
          className="hide-scrollbar"
          overflowY="auto"
          display="flex"
          height="90vh"
          width="full"
          flexDirection={'column'}
        >
          <Outlet />
        </Box>
        <Box flex={1}>
          <Adds />
        </Box>
      </Flex>
    </>
  );
}
