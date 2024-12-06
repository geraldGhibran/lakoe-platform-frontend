import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';

interface NavLinkProps {
  children: React.ReactNode;
  icon: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const Links = [
  { name: 'Dashboard', icon: 'lucide:home', path: '/admin' },
  { name: 'Withdraw', icon: 'bi:box-fill', path: '/admin/withdraw' },
];

const NavLink = ({ children, icon, path, isActive, onClick }: NavLinkProps) => {
  const activeColor = 'blue.500'; // Warna untuk teks dan ikon aktif
  const inactiveColor = 'gray.800'; // Warna untuk teks dan ikon tidak aktif
  const hoverBg = 'gray.200'; // Warna hover untuk semua link

  return (
    <Link
      as="a"
      display="flex"
      alignItems="center"
      px={20}
      py={5}
      rounded={'md'}
      overflow={'hidden'}
      href={path}
      onClick={onClick}
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
      }}
      color={isActive ? activeColor : inactiveColor}
    >
      <Icon
        icon={icon}
        width="24"
        height="24"
        style={{
          marginRight: '12px',
          color: isActive ? activeColor : inactiveColor,
        }}
      />
      {children}
    </Link>
  );
};

export default function LeftBarAdmin() {
  const { open, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <Box bg={'white'}>
      <Flex h={'100vh'}>
        <IconButton
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={open ? onClose : onOpen}
        />
        <HStack alignItems={'flex-start'} w={'100%'} p={5}>
          <Flex
            direction={'column'}
            justifyContent={'space-between'}
            h={'100%'}
          >
            <Stack gap={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  icon={link.icon}
                  path={link.path}
                  isActive={location.pathname === link.path}
                  onClick={() => {}}
                >
                  {link.name}
                </NavLink>
              ))}
            </Stack>

            <Box>
              <Button
                onClick={() => {
                  logout();
                }}
                color={'black'}
                bg={'transparent'}
                w={'100%'}
              >
                <Icon icon="solar:logout-2-outline" /> Logout
              </Button>
            </Box>
          </Flex>
        </HStack>
      </Flex>
      {open && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'}>
            {Links.map((link) => (
              <NavLink
                key={link.name}
                icon={link.icon}
                path={link.path}
                isActive={location.pathname === link.path}
                onClick={() => {}}
              >
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
