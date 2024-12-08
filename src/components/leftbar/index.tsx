'use client';

import { Box, Flex, HStack, Link } from '@chakra-ui/react';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
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
  { name: 'Produk', icon: 'bi:box-fill', path: '/products' },
  { name: 'Pesanan', icon: 'solar:bag-5-outline', path: '/order' },
];

const SettingsSubLinks = [
  { name: 'Atur Toko', path: '/settings' },
  { name: 'Pengiriman', path: '/order' },
  { name: 'Metode Pembayaran  ', path: '/products' },
];

const NavLink = ({ children, icon, path, isActive, onClick }: NavLinkProps) => {
  const linkColor = isActive ? 'blue.500' : 'gray.800';
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
      _hover={{ textDecoration: 'none', bg: 'gray.200' }}
      color={linkColor}
    >
      {icon && (
        <Icon
          icon={icon}
          width="24"
          height="24"
          style={{ marginRight: '12px', color: linkColor }}
        />
      )}
      {children}
    </Link>
  );
};

export default function SideBar() {
  const location = useLocation();

  return (
    <Box px={4} w="417px" bg="white" h={'100vh'}>
      <Flex h="50vh">
        <HStack>
          <HStack as="nav" display={{ base: 'none', md: 'flex' }}>
            <Flex direction="column" w="100%">
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
                    color={
                      SettingsSubLinks.some((subLink) =>
                        location.pathname.startsWith(subLink.path)
                      )
                        ? 'blue.500'
                        : 'gray.800'
                    }
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
                          color: SettingsSubLinks.some((subLink) =>
                            location.pathname.startsWith(subLink.path)
                          )
                            ? 'blue'
                            : 'gray.800',
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
            </Flex>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}
