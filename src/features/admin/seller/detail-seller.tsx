import { Avatar } from '@/components/ui/avatar';
import { formatCurrency } from '@/features/add-other/format-currency';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Spinner,
  StatLabel,
  StatRoot,
  StatValueText,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useStoreById } from '../hooks';

export function DetailSeller() {
  const { storeId } = useParams<{ storeId: any }>();
  const { data: store, isLoading, isError, error } = useStoreById(storeId);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (isError) {
    return <Text color="red.500">Error: {(error as Error).message}</Text>;
  }
  return (
    <Box bg={'white'} h={'100vh'}>
      <Flex alignItems="center" m={10}>
        <Box>
          <Avatar
            boxSize={'10rem'}
            src={
              store?.logo_img ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqsL-13Hag1GkSIL6dCH1pYm3CwQ7Tfqorcw&s'
            }
          />
        </Box>
        <Box ml={10}>
          <Text fontSize={'2xl'} mb={5}>
            {store?.name}
          </Text>
          <Text> {store?.slogan}</Text>
          <Text> {store?.description}</Text>
        </Box>
      </Flex>
      <Box m={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={6} color={'white'}>
          <GridItem p={4} bg="grey" borderRadius="md">
            <StatRoot>
              <StatLabel color={'white'}>Product</StatLabel>
              <StatValueText>{store?.products.length}</StatValueText>
            </StatRoot>
          </GridItem>
          <GridItem p={4} bg="grey" borderRadius="md">
            <StatRoot>
              <StatLabel color={'white'}>Amount</StatLabel>
              <StatValueText>
                {formatCurrency(store?.amount || 0)}
              </StatValueText>
            </StatRoot>
          </GridItem>

          <GridItem p={4} bg="grey" borderRadius="md">
            <StatRoot>
              <StatLabel color={'white'}>Request Withdraw</StatLabel>
              <StatValueText>
                {formatCurrency(store?.totalPendingWithdrawAmount || 0)}
              </StatValueText>
            </StatRoot>
          </GridItem>
        </Grid>

        <Box paddingTop={1}>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {store?.products.map((product) => (
              <Box
                key={product.id}
                bg="brand.product"
                borderRadius="md"
                bgColor={'blue.100'}
              >
                <Image
                  src={
                    product?.image[0]?.url ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'
                  }
                  objectFit={'cover'}
                  mx="auto"
                  mb={4}
                  h={'200px'}
                  w={'100%'}
                />
                <Text fontWeight="bold" ml={2}>
                  {product.name}
                </Text>
                <Text ml={2}>{formatCurrency(product.price)}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
