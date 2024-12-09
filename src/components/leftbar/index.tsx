'use client';

import { Box, Button, Flex, HStack, Link, Stack } from '@chakra-ui/react';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

interface NavLinkProps {
  children: React.ReactNode;
  icon: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const Links = [
  { name: 'Dashboard', icon: 'lucide:home', path: '/dashboard' },
  { name: 'Produk', icon: 'bi:box-fill', path: '/products' },
  { name: 'Pesanan', icon: 'solar:bag-5-outline', path: '/order' },
];

const SettingsSubLinks = [
  { name: 'Atur Toko', path: '/settings' },
  { name: 'Pengiriman', path: '/order' },
  { name: 'Metode Pembayaran  ', path: '/products' },
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
      py={3}
      rounded="md"
      href={path}
      onClick={onClick}
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
      }}
      color={isActive ? activeColor : inactiveColor}
    >
      {icon && (
        <Icon
          icon={icon}
          width="24"
          height="24"
          style={{
            marginRight: '12px',
            color: isActive ? activeColor : inactiveColor,
          }}
        />
      )}
      {children}
    </Link>
  );
};

export default function SideBar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <Box bg="white">
      <Flex h="100vh">
        <HStack>
          <HStack as="nav" display={{ base: 'none', md: 'flex' }}>
            <Flex direction="column" justifyContent={'space-between'} h="100vh">
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
                <AccordionRoot collapsible>
                  <AccordionItem key={'pengaturan'} value={'pengaturan'}>
                    <AccordionItemTrigger
                      px={20}
                      py={3}
                      _hover={{ bg: 'gray.200' }}
                      color="gray.800"
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        display="flex"
                        alignItems="center"
                      >
                        <Icon
                          icon="mdi:cog"
                          width="24"
                          height="24"
                          style={{
                            marginRight: '12px',
                            color: 'gray.200',
                          }}
                        />
                        Pengaturan
                      </Box>
                    </AccordionItemTrigger>
                    <AccordionItemContent position={'fixed'}>
                      {SettingsSubLinks.map((subLink) => (
                        <NavLink
                          key={subLink.name}
                          icon=""
                          path={subLink.path}
                          isActive={location.pathname === subLink.path}
                          onClick={() => {}}
                        >
                          {subLink.name}
                        </NavLink>
                      ))}
                    </AccordionItemContent>
                  </AccordionItem>
                </AccordionRoot>
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
        </HStack>
      </Flex>
    </Box>
  );
}
