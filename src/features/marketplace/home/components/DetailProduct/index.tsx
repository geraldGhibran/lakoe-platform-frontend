'use client';

import { useColorModeValue } from '@/components/ui/color-mode-value';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { useStore } from '@/store/counter';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  // ListItem,
  Separator,
  SimpleGrid,
  Span,
  Stack,
  // Divider,
  StackSeparator,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';

export default function DetailProduct() {
  const [value, setValue] = useState('1');

  // const { addItem, quantity, removeItem } = useCartStore();
  const { count, increaseCount, decreaseCount } = useStore();
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={
              'https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?q=80&w=1541&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack gap={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              Sepatu Mantap
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              Rp350.00 ID
            </Text>
          </Box>

          <StackSeparator gap={{ base: 4, sm: 6 }} direction={'column'}>
            <Stack gap="4">
              <Separator size="sm" />
            </Stack>
            <VStack mb={4} gap={{ base: 4, sm: 6 }}>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '26px', lg: '28px' }}
                color={useColorModeValue('black.500', 'black.300')}
                fontWeight={'500'}
                mb={'4'}
              >
                Pilih Warna
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} mb={6} gap={10}>
                <RadioGroup
                  colorPalette={'blue'}
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                  <HStack gap="6">
                    <Radio value="1">Merah</Radio>
                    <Radio value="2">Biru</Radio>
                  </HStack>
                </RadioGroup>
              </SimpleGrid>
              <Stack gap="4">
                <Separator size="sm" />
              </Stack>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '26px', lg: '28px' }}
                color={useColorModeValue('black.500', 'black.300')}
                fontWeight={'500'}
                mb={'4'}
              >
                Jumlah
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} mb={6} gap={10}>
                <HStack gap="6">
                  <Button colorPalette={'red'} onClick={() => decreaseCount()}>
                    <Text>-</Text>
                  </Button>
                  <Span rounded={'full'}>
                    <Text fontSize={'lg'}>{count}</Text>
                  </Span>

                  <Button
                    colorPalette={'green'}
                    onClick={() => increaseCount()}
                  >
                    <Text>+</Text>
                  </Button>
                </HStack>
              </SimpleGrid>
              <Stack gap="4">
                <Separator size="sm" />
              </Stack>
            </Box>
            <Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} mt={6} mb={6} gap={10}>
                <HStack gap="6">
                  <Button colorPalette="gray" variant="solid">
                    <Icon icon="mdi:cart" /> Langsung Beli
                  </Button>
                  <Button colorPalette="blue" variant="solid">
                    <Icon icon="mdi:plus" /> Kerangjang{' '}
                    <Icon icon="mdi:arrow-right" />
                  </Button>
                </HStack>
              </SimpleGrid>
            </Box>
          </StackSeparator>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
