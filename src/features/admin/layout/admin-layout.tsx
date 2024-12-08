import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import LeftBarAdmin from '../nav/leftbar-admin';
import { useAuthStore } from '@/store/auth';
import { PrivateRoute } from '@/components/PrivateRoute';
import { Adds } from '../adds/adds';

export function AdminLayout() {
  const { user } = useAuthStore();
  return (
    <PrivateRoute role={user?.role || ''} allowedRoles={['ADMIN']}>
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
