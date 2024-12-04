import { Button } from '@/components/ui/button';
import { Box, Card, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link as RouterLink } from 'react-router-dom';

export const CardHorizontal = () => (
  <Card.Root
    flexDirection="row"
    overflow="hidden"
    maxW="xl"
    borderRadius={'lg'}
    colorPalette={'blue'}
  >
    <Box>
      <Card.Body colorPalette={'blue'}>
        <Card.Title mb="2">Order Summary</Card.Title>
        <Card.Description>
          Subtotal <Text fontWeight={'bold'}>Rp. 100.000</Text>
        </Card.Description>
      </Card.Body>
      <Card.Footer colorPalette={'blue'} maxW={'full'}>
        <RouterLink to="/checkout">
          <Button colorPalette="blue" variant="solid">
            Checkout <Icon icon="mdi:check-circle" />
          </Button>
        </RouterLink>
      </Card.Footer>
    </Box>
  </Card.Root>
);
