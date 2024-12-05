'use client';

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
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
  { name: 'Produk', icon: 'bi:box-fill', path: '/add-product' },
  { name: 'Pesanan', icon: 'solar:bag-5-outline', path: '/order' },
];

const NavLink = ({ children, icon, path, isActive, onClick }: NavLinkProps) => {
  const hoverBg = 'gray.200';
  const linkColor = 'gray.800';
  const iconColor = isActive ? 'blue' : linkColor;

  return (
    <Link
      as="a"
      display="flex"
      alignItems="center"
      px={20}
      py={5}
      rounded={'md'}
      href={path}
      onClick={onClick}
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
      }}
      color={isActive ? 'blue.500' : linkColor}
    >
      <Icon
        icon={icon}
        width="24"
        height="24"
        style={{
          marginRight: '12px',
          color: iconColor,
        }}
      />
      {children}
    </Link>
  );
};

export default function SideBar() {
  const { open, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  return (
    <Box px={4} w={'100%'}>
      <Flex h={'50vh'} justifyContent={'space-between'}>
        <IconButton
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={open ? onClose : onOpen}
        />
        <HStack alignItems={'center'}>
          <HStack as={'nav'} display={{ base: 'none', md: 'flex' }}>
            <Flex direction={'column'}>
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
              <MenuRoot>
                <MenuTrigger asChild>
                  <Link
                    display="flex"
                    alignItems="center"
                    px={20}
                    py={5}
                    rounded={'md'}
                    _hover={{
                      bg: 'gray.200',
                    }}
                    color={
                      location.pathname.startsWith('/settings')
                        ? 'blue.500'
                        : 'gray.800'
                    }
                  >
                    <Icon
                      icon="mdi:cog"
                      width="24"
                      height="24"
                      style={{
                        marginRight: '12px',
                        color: location.pathname.startsWith('/settings')
                          ? 'blue'
                          : 'gray.800', // Static icon color
                      }}
                    />
                    Pengaturan{' '}
                    <Icon
                      style={{
                        marginLeft: '100px',
                        width: '24px',
                        height: '24px',
                      }}
                      icon="gridicons:dropdown"
                    />
                  </Link>
                </MenuTrigger>
                <MenuContent width={400}>
                  <Box pl={2} ml={14}>
                    <MenuItem value="profile">
                      <Icon icon="ph:dot-fill" width="30" height="30" />
                      <Box fontSize={'15px'}>Atur Toko</Box>
                    </MenuItem>
                  </Box>
                  <Box pl={2} ml={14}>
                    <MenuItem value="account">
                      <Icon icon="ph:dot-fill" width="30" height="30" />
                      <Box fontSize={'15px'}>Pengiriman</Box>
                    </MenuItem>
                  </Box>
                  <Box pl={2} ml={14}>
                    <MenuItem value="security">
                      <Icon icon="ph:dot-fill" width="30" height="30" />
                      <Box fontSize={'15px'}>Metode Pembayaran</Box>
                    </MenuItem>
                  </Box>
                </MenuContent>
              </MenuRoot>
            </Flex>
          </HStack>
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
      <Box mt={'340px'}>
        <NavLink
          icon="gg:profile"
          path="/"
          isActive={location.pathname === '/profile'}
          onClick={() => {}}
        >
          Profile
        </NavLink>
      </Box>
    </Box>
  );
}
