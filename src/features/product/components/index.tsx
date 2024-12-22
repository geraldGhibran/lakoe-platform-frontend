import { Box, Button, Stack, Tabs, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import NotFoundCard from './notFound';
import Header from './CardProduct/header';
import CardProduct from './CardProduct/card';
// import { allProducts } from './CardProduct/dumy';
import { useState, useEffect } from 'react';
import '@/styles/styes.css';
import { useGetProductSeller } from '../hooks/use-get-product';

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
  const { data: products = [], isLoading } = useGetProductSeller();

  const [productStates, setProductStates] = useState(
    products.map((product: Product) => ({
      id: product.id,
      isActive: product.isActive,
    }))
  );

  useEffect(() => {
    if (products.length > 0) {
      setProductStates(
        products.map((product: Product) => ({
          id: product.id,
          isActive: product.isActive,
          isChecked: false,
        }))
      );
    }
  }, [products]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setProductStates(
      (prevStates: { id: number; isActive: boolean; isChecked?: boolean }[]) =>
        prevStates.map((state) =>
          state.id === id ? { ...state, isChecked: checked } : state
        )
    );
  };

  const [switchingProduct, setSwitchingProduct] = useState<number | null>(null);

  const handleSwitchChange = (id: number, checked: boolean) => {
    setSwitchingProduct(id);

    setProductStates(
      (prevStates: { id: number; isActive: boolean; isChecked?: boolean }[]) =>
        prevStates.map((state) =>
          state.id === id ? { ...state, isActive: checked } : state
        )
    );

    setTimeout(() => {
      setSwitchingProduct(null);
    }, 300);
  };

  const handleSelectAll = (checked: boolean) => {
    setProductStates(
      (prevStates: { id: number; isActive: boolean; isChecked?: boolean }[]) =>
        prevStates.map((state) => ({ ...state, isChecked: checked }))
    );
  };

  const getFilteredProducts = (isActive: boolean): Product[] => {
    return products.filter((product: Product) => {
      const productState = productStates.find(
        (state: { id: number; isActive: boolean; isChecked?: boolean }) =>
          state.id === product.id
      );
      return (
        productState?.isActive === isActive || product.id === switchingProduct
      );
    });
  };

  const renderProducts = (products: Product[]) => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    if (products.length === 0) {
      return (
        <NotFoundCard>
          <Text>Tidak ada produk yang ditemukan.</Text>
        </NotFoundCard>
      );
    }

    return products.map((product) => {
      const productState = productStates.find(
        (state: { id: number; isActive: boolean; isChecked?: boolean }) =>
          state.id === product.id
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
        <Box overflowY="auto" pt={4} className="hide-scrollbar">
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
              {renderProducts(products)}
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
