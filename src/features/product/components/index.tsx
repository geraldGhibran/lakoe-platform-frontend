import { useAuthStore } from '@/store/auth';
import { Box, Button, Stack, Tabs, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import NotFoundCard from './notFound';
import Header from './CardProduct/header';
import CardProduct from './CardProduct/card';
import { allProducts } from './CardProduct/dumy';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  sku: string;
  Url: string;
  image: string;
  isActive: boolean;
}

function ProductList() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  console.log('user', user);

  const [productStates, setProductStates] = useState(
    allProducts.map((product) => ({
      id: product.id,
      isActive: product.isActive,
      isChecked: false,
    }))
  );

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setProductStates((prevStates) =>
      prevStates.map((state) =>
        state.id === id ? { ...state, isChecked: checked } : state
      )
    );
  };

  const handleSwitchChange = (id: number, checked: boolean) => {
    setProductStates((prevStates) =>
      prevStates.map((state) =>
        state.id === id ? { ...state, isActive: checked } : state
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setProductStates((prevStates) =>
      prevStates.map((state) => ({ ...state, isChecked: checked }))
    );
  };

  const getFilteredProducts = (isActive: boolean): Product[] => {
    return allProducts.filter((product) => {
      const productState = productStates.find(
        (state) => state.id === product.id
      );
      return productState?.isActive === isActive;
    });
  };

  const renderProducts = (products: Product[]) => {
    if (products.length === 0) {
      return (
        <NotFoundCard>
          <Text>Tidak ada produk yang ditemukan.</Text>
        </NotFoundCard>
      );
    }

    return products.map((product) => {
      const productState = productStates.find(
        (state) => state.id === product.id
      );
      return (
        <CardProduct
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description}
          image={product.image}
          price={product.price}
          stock={product.stock}
          sku={product.sku}
          Url={product.Url}
          isActive={productState?.isActive || false}
          onCheckboxChange={(checked) =>
            handleCheckboxChange(product.id, checked)
          }
          onSwitchChange={(checked) => handleSwitchChange(product.id, checked)}
          isChecked={productState?.isChecked || false}
        />
      );
    });
  };

  return (
    <Stack direction={'row'} bg={'#F4F4F5'} height={'100vh'}>
      <Box
        bg={'white'}
        p={5}
        mx={'auto'}
        rounded={'md'}
        width={'100%'}
        display="flex"
        flexDirection="column"
      >
        <Box
          position="sticky"
          top="0"
          bg="white"
          zIndex="10"
          height={'80px'}
          mb={'-20px'}
          borderBottom="1px solid #E6E6E6"
          py={4}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text fontWeight={'bold'} fontSize={'2xl'}>
              Daftar Produk
            </Text>
            <Button
              rounded={'full'}
              onClick={() => navigate('/add-product')}
              bgColor={'blue.500'}
            >
              <Icon icon={'icons8:plus'} />
              <Text ml={2}>Tambah Produk</Text>
            </Button>
          </Box>
        </Box>
        <Box overflowY="auto" pt={4}>
          <Tabs.Root defaultValue={'all'} variant="plain">
            <Tabs.List
              position="sticky"
              zIndex="10"
              top="0"
              bg="white"
              borderBottom="1px solid #E6E6E6"
              width={'100%'}
              h={'40px'}
            >
              <Tabs.Trigger
                value="all"
                _selected={{
                  borderBottomColor: '#0086B4',
                  color: '#0086B4',
                }}
                borderBottom="4px solid transparent"
              >
                Semua
              </Tabs.Trigger>
              <Tabs.Trigger
                value="active"
                _selected={{
                  borderBottomColor: '#0086B4',
                  color: '#0086B4',
                }}
                borderBottom="4px solid transparent"
              >
                Active
              </Tabs.Trigger>
              <Tabs.Trigger
                value="nonactive"
                _selected={{
                  borderBottomColor: '#0086B4',
                  color: '#0086B4',
                }}
                borderBottom="4px solid transparent"
              >
                NonActive
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="all">
              <Box
                position="sticky"
                top="60px"
                zIndex="9"
                borderBottom="1px solid #E6E6E6"
                py={2}
              >
                <Header onSelectAll={handleSelectAll} />
              </Box>
              {renderProducts(allProducts)}
            </Tabs.Content>

            <Tabs.Content value="active">
              <Box
                position="sticky"
                top="60px"
                bg="white"
                zIndex="9"
                borderBottom="1px solid #E6E6E6"
                py={2}
              >
                <Header onSelectAll={handleSelectAll} />
              </Box>
              {renderProducts(getFilteredProducts(true))}
            </Tabs.Content>

            <Tabs.Content value="nonactive">
              <Box
                position="sticky"
                top="60px"
                bg="white"
                zIndex="9"
                borderBottom="1px solid #E6E6E6"
                py={2}
              >
                <Header onSelectAll={handleSelectAll} />
              </Box>
              {renderProducts(getFilteredProducts(false))}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Stack>
  );
}

export default ProductList;
