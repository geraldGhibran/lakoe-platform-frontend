import { Box, Button, HStack, Stack, Tabs, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import NotFoundCard from './notFound';
import Header from './CardProduct/header';
import CardProduct from './CardProduct/card';
import { useState, useEffect } from 'react';
import '@/styles/styes.css';
import { useGetProductSeller } from '../hooks/use-get-product';
import { Skeleton, SkeletonCircle } from '@/components/ui/skeleton';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  sku: string;
  Url: string;
  image: string | { url: string }[];
  isActive: boolean;
  categories_id: number;
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

  const [sortOrder, setSortOrder] = useState<string>('all');

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    if (value === 'Terlama') {
      products.sort((a: Product, b: Product) => a.id - b.id);
    } else if (value === 'Terbaru') {
      products.sort((a: Product, b: Product) => b.id - a.id);
    } else if (value === 'Termahal') {
      products.sort((a: Product, b: Product) => b.price - a.price);
    } else if (value === 'Termurah') {
      products.sort((a: Product, b: Product) => a.price - b.price);
    }
  };

  const renderProducts = (products: Product[]) => {
    if (isLoading) {
      return (
        <HStack padding="50px" gap="5">
          <SkeletonCircle size="12" />
          <Stack flex="1">
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
          </Stack>
        </HStack>
      );
    }
    if (products.length === 0) {
      return (
        <NotFoundCard>
          <Text>Tidak ada produk yang ditemukan.</Text>
        </NotFoundCard>
      );
    }

    const sortedProducts =
      sortOrder === 'Terbaru'
        ? [...products].sort((a, b) => b.id - a.id)
        : sortOrder === 'Terlama'
          ? [...products].sort((a, b) => a.id - b.id)
          : products;

    return sortedProducts.map((product) => {
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
          image={
            Array.isArray(product.image) && product.image.length > 0
              ? product.image[0].url
              : ''
          }
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

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = products.filter(
    (product: Product) =>
      (selectedCategory === null ||
        product.categories_id === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showNotFound, setShowNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (filteredProducts.length === 0) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [filteredProducts]);

  return (
    <Stack
      direction={'row'}
      bg={'#F4F4F5'}
      overflowY="auto"
      height="100vh"
      width="full"
    >
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
            zIndex={9}
          >
            <Text fontWeight={'bold'} fontSize={'2xl'}>
              Daftar Produk
            </Text>
            <Button
              zIndex="base"
              color="white"
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
            <Tabs.Content position="relative" value="all">
              <Header
                onSelectAll={handleSelectAll}
                totalProducts={filteredProducts.length}
                handleSortChange={handleSortChange}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
              />
              {showNotFound ? (
                <NotFoundCard>
                  <Text>Tidak ada produk yang ditemukan.</Text>
                </NotFoundCard>
              ) : (
                renderProducts(filteredProducts)
              )}
            </Tabs.Content>

            <Tabs.Content value="active">
              {renderProducts(getFilteredProducts(true))}
            </Tabs.Content>

            <Tabs.Content value="nonactive">
              {renderProducts(getFilteredProducts(false))}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Stack>
  );
}

export default ProductList;
