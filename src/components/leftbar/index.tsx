import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { ColorModeButton } from '../ui/color-mode';

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
  { name: 'Atur Toko', path: 'settings' },
  { name: 'Pengiriman', path: 'pengiriman' },
  { name: 'Metode Pembayaran', path: 'metode-pembayaran' },
];

const NavLink = ({ children, icon, path, isActive, onClick }: NavLinkProps) => {
  return (
    <Box
      color={isActive ? 'blue.500' : 'gray.800'}
      onClick={onClick}
      mx={'60px'}
    >
      <Link
        to={path}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          backgroundColor: isActive ? 'gray.200' : 'transparent',
        }}
      >
        <Icon
          icon={icon}
          width="24"
          height="24"
          style={{
            marginRight: '12px',
          }}
        />
        <Box color={isActive ? 'blue.500' : 'gray.800'}>{children}</Box>
      </Link>
    </Box>
  );
};

export default function SideBar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const isSettingsActive = SettingsSubLinks.some(
    (subLink) => location.pathname === subLink.path
  );

  return (
    <Box bg="white">
      <Flex h="100vh">
        <HStack>
          <HStack as="nav" display={{ base: 'none', md: 'flex' }}>
            <Flex direction="column" justifyContent={'space-between'} h="80vh">
              <Stack gap={4}>
                {Links.map((link) => (
                  <NavLink
                    key={link.name}
                    icon={link.icon}
                    path={link.path}
                    isActive={location.pathname === link.path}
                    onClick={() => { }}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <AccordionRoot collapsible unstyled>
                  <AccordionItem key={'pengaturan'} value={'pengaturan'}>
                    <AccordionItemTrigger
                      display="flex"
                      alignItems="center"
                      gap="10px"
                      px={20}
                      py={3}
                      _hover={{ bg: 'gray.200' }}
                      color={isSettingsActive ? 'blue.500' : 'gray.800'}
                    >
                      <Box textAlign="left" display="flex" alignItems="center">
                        <Icon
                          icon="mdi:cog"
                          width="24"
                          height="24"
                          style={{
                            marginRight: '12px',
                            color: isSettingsActive ? 'blue.500' : 'gray.800',
                          }}
                        />
                        Pengaturan
                      </Box>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                      {SettingsSubLinks.map((subLink) => (
                        <NavLink
                          key={subLink.name}
                          icon=""
                          path={subLink.path}
                          isActive={location.pathname === subLink.path}
                          onClick={() => { }}
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

                <ColorModeButton />
              </Box>
            </Flex>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}
