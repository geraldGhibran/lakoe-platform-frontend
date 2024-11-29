'use client';

import { useColorModeValue } from '@/components/ui/color-mode-value';
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
import { useState } from 'react';

interface NavLinkProps {
  children: React.ReactNode;
  icon: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const Links = [
  { name: 'Dashboard', icon: 'lucide:home', path: '/dashboard' },
  { name: 'Produk', icon: 'bi:box-fill', path: '/produk' },
  { name: 'Pesanan', icon: 'solar:bag-5-outline', path: '/pesanan' },
  { name: 'Pengaturan', icon: 'mdi:cog', path: '/pengaturan' },
];

const NavLink = ({ children, icon, path, isActive, onClick }: NavLinkProps) => {
  // Panggilan useColorModeValue dipindahkan ke luar JSX
  const hoverBg = useColorModeValue('gray.200', 'gray.700');
  const linkColor = useColorModeValue('gray.800', 'white');
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

export default function NavComponent() {
  const { isopen, onOpen, onClose } = useDisclosure();
  const [activePath, setActivePath] = useState<string>('/produk');

  return (
    <Box px={4}>
      <Flex h={'50vh'} justifyContent={'space-between'}>
        <IconButton
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isopen ? onClose : onOpen}
        />
        <HStack alignItems={'center'}>
          <HStack as={'nav'} display={{ base: 'none', md: 'flex' }}>
            <Flex direction={'column'}>
              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  icon={link.icon}
                  path={link.path}
                  isActive={activePath === link.path}
                  onClick={() => setActivePath(link.path)}
                >
                  {link.name}
                </NavLink>
              ))}
            </Flex>
          </HStack>
        </HStack>
      </Flex>

      {isopen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'}>
            {Links.map((link) => (
              <NavLink
                key={link.name}
                icon={link.icon}
                path={link.path}
                isActive={activePath === link.path}
                onClick={() => setActivePath(link.path)}
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
