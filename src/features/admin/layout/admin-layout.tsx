import { PrivateRoute } from '@/components/PrivateRoute';
import { useAuthStore } from '@/store/auth';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Adds } from '../adds/adds';
import LeftBarAdmin from '../nav/leftbar-admin';

export function AdminLayout() {
  const { user } = useAuthStore();
  return (
    <PrivateRoute role={user?.role || ''} allowedRoles={['ADMIN']}>
      <Box top={0} bg="white" zIndex={10} boxShadow="md" p={3} mb={4}></Box>
      <Flex bg={'gray.100'}>
        <Box flex={1}>
          <LeftBarAdmin />
        </Box>
        <Box flex={3} m={4}>
          <Outlet />
        </Box>
        <Box flex={1}>
          <Adds />
        </Box>
      </Flex>
    </PrivateRoute>
  );
}
