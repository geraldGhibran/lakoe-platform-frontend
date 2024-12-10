'use client';

import { CardHorizontal } from '@/features/marketplace/home/components/CardHorizontal';
import {
  Container,
  GridItem,
  SimpleGrid,
  Stack,
  StackSeparator,
  Text,
} from '@chakra-ui/react';
import CheckoutForm from '../CheckoutForm';

export default function CheckoutComponent() {
  return (
    <Container maxW="8xl" mt={10}>
      <SimpleGrid
        columns={{ base: 2, md: 4 }}
        gap={{ base: '24px', md: '40px' }}
        my="auto"
      >
        <GridItem colSpan={{ base: 1, md: 3 }} my="auto">
          <Text textStyle="4xl" mb={4}>
            Checkouts
          </Text>
          <Stack>
            <CheckoutForm />
          </Stack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }} my={'24'}>
          <Stack>
            <StackSeparator gap={{ base: 4, sm: 6 }} direction={'column'}>
              <Stack gap="4">
                <CardHorizontal />
              </Stack>
            </StackSeparator>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}
