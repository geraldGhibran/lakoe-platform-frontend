import { useCartStore } from '@/store/cart-store';
import '@/styles/styes.css';
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SwiperCore from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  useGetProductDetail,
  useSetCourierAndAreaId,
} from '@/features/product/hooks/use-get-product-detail';
import { toaster } from '@/components/ui/toaster-placement';
import { Toaster } from '@/components/ui/toaster';
import { formatCurrency } from '@/features/add-other/format-currency';
import file from '@/assets/images/product-not-found.jpeg';

interface VariantItemValue {
  id: number;
  name: string;
  sku: string;
  weight: number;
  stock: number;
  is_active: boolean;
  price: number;
  product_id: number;
}

export default function DetailProduct() {
  const { name } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  // const [activeVariantId, setActiveVariantId] = useState<number | null>(null);
  // const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  // const [selectedStock, setSelectedStock] = useState<number | null>(null);

  const {
    addItem,
    quantity,
    setTotalQuantity,
    setProductImage,
    setHeightProduct,
    setLengthProduct,
    setWidthProduct,
    setDescription,
    setStoreId,
  } = useCartStore();

  const { data: productDetail, isLoading } = useGetProductDetail(name ?? '');

  const product =
    productDetail && productDetail.length > 0 ? productDetail[0] : null;

  useSetCourierAndAreaId(productDetail);

  useEffect(() => {
    if (product?.image?.[0]?.url) {
      setProductImage(product.image[0].url);
    }
    if (product?.Height) {
      setHeightProduct(product.Height);
    }
    if (product?.length) {
      setLengthProduct(product.length);
    }
    if (product?.width) {
      setWidthProduct(product.width);
    }
    if (product?.description) {
      setDescription(product.description);
    }
    if (product?.store_id) {
      setStoreId(product.store_id);
    }
  }, [
    product,
    setProductImage,
    setHeightProduct,
    setLengthProduct,
    setWidthProduct,
    setDescription,
    setStoreId,
  ]);

  if (isLoading)
    return (
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        colorPalette="teal"
      >
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </Box>
    );
  if (!productDetail || !productDetail.length)
    return (
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        colorPalette="teal"
      >
        <Image src={file} />
      </Box>
    );

  if (!product) return <Text>Detail produk tidak tersedia.</Text>;

  return (
    <Box padding="0 10px">
      <Toaster />

      <Flex
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
        color="black"
      >
        <Box
          width={{ base: 'full', lg: '1/2' }}
          padding="20px"
          height={{ base: '50vh', md: '80vh', lg: '80vh' }}
        >
          <Swiper
            style={
              {
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              } as React.CSSProperties
            }
            spaceBetween={10}
            navigation={true}
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {product.image.map((img: { id: number; url: string }) => (
              <SwiperSlide key={img.id} className="rounded">
                <Image src={img.url} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={(swiper) => setThumbsSwiper(swiper)}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {product.image.map((img: { id: number; url: string }) => (
              <SwiperSlide key={img.id}>
                <Image src={img.url} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Descriptions */}
        <Box gap="20px" padding="20px" w="full" display="flex" flexDir="column">
          <Text fontWeight="bold" fontSize={{ base: '20px', lg: '30px' }}>
            {product.name} - {product.description}
          </Text>

          <Flex>
            <Box
              width="1/3"
              pt="10px"
              justifyContent="space-between"
              height="60%"
              display={{ base: 'none', md: 'none', lg: 'flex' }}
              fontWeight="bold"
              flexDir="column"
            >
              <Text>Harga</Text>
              <Text>Pilih Variant</Text>
              <Text>Jumlah</Text>
            </Box>

            <Box borderColor="gainsboro">
              <Flex wrap="wrap" gap="5px">
                <Tabs.Root
                  flexWrap="wrap"
                  unstyled
                  variant="outline"
                  lazyMount
                  unmountOnExit
                  defaultValue={`tab-${product.variant_Item_values[0]?.id || '0'}`}
                >
                  {product.variant_Item_values.map(
                    (variant: VariantItemValue) => (
                      <>
                        <Tabs.Content
                          key={variant.id}
                          value={`tab-${variant.id}`}
                        >
                          {/* <div>
                            <p>
                              <strong>SKU:</strong> {variant.sku}
                            </p>
                            <p>
                              <strong>Weight:</strong> {variant.weight}g
                            </p>
                            <p>
                              <strong>Stock:</strong> {variant.stock}
                            </p>
                            <p>
                              <strong>Price:</strong>{' '}
                              {variant.price.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })}
                            </p>
                            <p>
                              <strong>Status:</strong>{' '}
                              {variant.is_active ? 'Active' : 'Inactive'}
                            </p> */}
                          <Text fontSize="25px">
                            {formatCurrency(variant.price)}
                          </Text>
                          <Text color="gray" py="10px">
                            {product.variant_Item_values.length} Pilihan
                          </Text>

                          <Tabs.List
                            pb="20px"
                            width="full"
                            display="flex"
                            flexWrap="wrap"
                            gap="10px"
                          >
                            {product.variant_Item_values.map(
                              (variant: VariantItemValue) => (
                                <Tabs.Trigger
                                  _selected={{ bgColor: 'gainsboro' }}
                                  as={Button}
                                  bgColor="white"
                                  fontWeight="normal"
                                  color="black"
                                  border="1px solid gray"
                                  key={variant.id}
                                  value={`tab-${variant.id}`}
                                >
                                  {variant.name}
                                </Tabs.Trigger>
                              )
                            )}
                          </Tabs.List>

                          <Box bgColor="white">
                            <Box
                              pb="20px"
                              display="flex"
                              alignItems="center"
                              gap="10px"
                              borderBottom="1px solid gainsboro"
                            >
                              <Flex gap="10px">
                                <Button
                                  display="flex"
                                  justifyContent="center"
                                  bgColor="white"
                                  color="black"
                                  alignItems="center"
                                  border="1px solid gray"
                                  boxSizing="30px"
                                  rounded="sm"
                                  onClick={() => {
                                    setTotalQuantity(quantity - 1);
                                  }}
                                  disabled={quantity <= 0}
                                >
                                  -
                                </Button>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  border="1px solid gainsboro"
                                  width="40px"
                                  rounded="sm"
                                >
                                  {quantity}
                                </Box>
                                <Button
                                  onClick={() => {
                                    setTotalQuantity(quantity + 1);
                                  }}
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  bgColor="white"
                                  color="black"
                                  border="1px solid gray"
                                  boxSizing="30px"
                                  rounded="sm"
                                >
                                  +
                                </Button>
                              </Flex>
                              <Text>Tersedia {variant.stock} Stock</Text>
                            </Box>
                          </Box>
                          <Box bgColor="white">
                            <Box borderColor="transparent" padding="20px 0">
                              <Flex gap="10px">
                                <Link to="/checkout">
                                  <Button
                                    onClick={() => {
                                      addItem({
                                        product: product,
                                        variant,
                                        quantity: 1,
                                      });
                                    }}
                                    bgColor="white"
                                    color="black"
                                    border="1px solid gray"
                                    padding="0 20px"
                                  >
                                    Beli Langsung
                                  </Button>
                                </Link>
                                <Link to="/cart">
                                  <Button
                                    onClick={() => {
                                      toaster.create({
                                        title: 'Berhasil tambah ke cart',
                                        type: 'success',
                                        duration: 3000,
                                        description:
                                          'You have successfully logged in.',
                                      });
                                      addItem({
                                        product: product,
                                        variant,
                                        quantity: quantity,
                                      });
                                    }}
                                    bgColor="#0080FF"
                                    color="white"
                                    padding="0 20px"
                                  >
                                    + Keranjang
                                  </Button>
                                </Link>
                              </Flex>
                            </Box>
                          </Box>
                          {/* </div> */}
                        </Tabs.Content>
                      </>
                    )
                  )}
                </Tabs.Root>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
