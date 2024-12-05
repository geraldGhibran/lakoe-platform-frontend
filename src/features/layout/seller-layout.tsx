import SideBar from '@/components/leftbar';
import { PrivateRoute } from '@/components/PrivateRoute';
import { useAuthStore } from '@/store/auth';
import { Box, Flex } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';
import { Adds } from '../admin/adds/adds';

export function SellerLayout() {
  const { user, token } = useAuthStore();
  const cookieToken = Cookies.get('token') || '';
  const cookieUser = Cookies.get('user') || '';

  if (!user || !token || !cookieToken || !cookieUser) {
    return (
      <PrivateRoute role={user?.role || ''} allowedRoles={['SELLER']}>
        <Flex bg={'gray.100'}>
          <Box flex={1}>
            <SideBar />
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
  return <></>;
}
