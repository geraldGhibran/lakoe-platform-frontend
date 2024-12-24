import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Box, Button, Flex, Image, Table, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import '@/styles/styes.css';
import { useCartStore } from '@/store/cart-store';
// import { useGetDummyProduct } from '../../hooks/useGetDummyProduct';
import { useGetProductDetail } from '@/features/product/hooks/use-get-product-detail';

interface VariantItemValue {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function DetailProduct() {
  const { name } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [activeVariantId, setActiveVariantId] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedStock, setSelectedStock] = useState<number | null>(null);

  const { products, addItem, decreaseQuantity } = useCartStore();

  // const { data: product } = useGetDummyProduct();
  const { data: productDetail, isLoading } = useGetProductDetail(name ?? '');

  console.log('Products:', products);

  if (isLoading) return <Text>Loading...</Text>;
  if (!productDetail || !productDetail.length)
    return <Text>Produk tidak ditemukan.</Text>;

  const product = productDetail[0];

  if (!product) return <Text>Detail produk tidak tersedia.</Text>;

  const currentQuantity =
    products?.find((p) => p.product.id === product.id)?.quantity || 0;

  return (
    <Box padding="0 10px">
      <Flex color="black">
        <Box width="1/2" padding="20px" height="80vh">
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
            {/* {[...Array(10)].map((_, index) => ( */}
            {product.image.map((img: { id: number; url: string }) => (
              <SwiperSlide key={img.id} className="rounded">
                <Image
                  src={img.url}
                  // alt={`Slide ${index + 1}`}
                />
              </SwiperSlide>
            ))}
            {/* ))} */}
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
            {/* {[...Array(10)].map((_, index) => ( */}
            {product.image.map((img: { id: number; url: string }) => (
              <SwiperSlide key={img.id}>
                <Image
                  src={img.url}
                  // alt={`Thumbnail ${index + 1}`}
                />
              </SwiperSlide>
            ))}
            {/* ))} */}
          </Swiper>
        </Box>

        {/* Descriptions */}
        <Box gap="20px" padding="20px" w="full" display="flex" flexDir="column">
          <Text fontWeight="bold" fontSize="30px">
            {product.name} - {product.description}
          </Text>

          <Table.Root borderColor="">
            <Table.Body>
              <Table.Row bgColor="white">
                <Table.Cell
                  borderColor="transparent"
                  fontWeight="medium"
                  w="1/3"
                >
                  Harga
                </Table.Cell>
                <Table.Cell borderBottom="1px solid gainsboro">
                  Rp.{' '}
                  {selectedPrice
                    ? selectedPrice.toLocaleString('id-ID')
                    : product.price.toLocaleString('id-ID')}
                </Table.Cell>
              </Table.Row>
              <Table.Row borderBottom="1px solid gainsboro" bgColor="white">
                <Table.Cell borderColor="gainsboro" fontWeight="medium" w="1/3">
                  Pilih Varian
                </Table.Cell>
                <Table.Cell borderColor="gainsboro">
                  <Text mb="10px">
                    {product.variant_Item_values.length} Pilihan
                  </Text>
                  <Flex wrap="wrap" gap="5px">
                    {product.variant_Item_values.length === 0 ? (
                      <Text>Tidak ada variant item yang tersedia.</Text>
                    ) : (
                      product.variant_Item_values.map(
                        (item: VariantItemValue) => (
                          <Button
                            key={item.id}
                            border="1px solid gray"
                            color={
                              activeVariantId === item.id ? 'white' : 'black'
                            }
                            bgColor={
                              activeVariantId === item.id ? 'gray' : 'White'
                            }
                            onClick={() => {
                              setActiveVariantId(item.id);
                              setSelectedPrice(item.price);
                              setSelectedStock(item.stock);
                              console.log(`Button for ${item.name} clicked`);
                            }}
                          >
                            {item.name}
                          </Button>
                        )
                      )
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
              <Table.Row bgColor="white">
                <Table.Cell
                  borderColor="transparent"
                  fontWeight="medium"
                  w="1/3"
                >
                  Jumlah
                </Table.Cell>
                <Table.Cell
                  display="flex"
                  gap="10px"
                  borderBottom="1px solid gainsboro"
                >
                  <Flex gap="10px">
                    <Button
                      onClick={() => decreaseQuantity(product?.id ?? 0)}
                      display="flex"
                      justifyContent="center"
                      bgColor="white"
                      color="black"
                      alignItems="center"
                      border="1px solid gray"
                      boxSizing="30px"
                      rounded="sm"
                      disabled={currentQuantity <= 0}
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
                      {currentQuantity}
                    </Box>
                    <Button
                      onClick={() => {
                        if (product) {
                          const quantity =
                            products?.find((p) => p.product.id === product.id)
                              ?.quantity || 0;
                          if (quantity >= (selectedStock ?? Infinity)) {
                            addItem({ product, quantity: selectedStock ?? 1 });
                          } else {
                            addItem({ product, quantity: 1 });
                          }
                        }
                      }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgColor="white"
                      color="black"
                      border="1px solid gray"
                      boxSizing="30px"
                      rounded="sm"
                      disabled={
                        (products?.find((p) => p.product.id === product.id)
                          ?.quantity || 0) >= (selectedStock ?? Infinity) ||
                        !selectedStock ||
                        product.variant_Item_values.length === 0
                      }
                    >
                      +
                    </Button>
                  </Flex>
                  {selectedStock !== null
                    ? 'Tersedia : ' + selectedStock + ' Stock'
                    : 'Silahkan pilih variant'}
                </Table.Cell>
              </Table.Row>
              <Table.Row bgColor="white">
                <Table.Cell borderColor="transparent" w="1/3"></Table.Cell>
                <Table.Cell borderColor="transparent" padding="20px 0">
                  <Flex gap="10px">
                    <Link to="checkout">
                      <Button
                        bgColor="white"
                        color="black"
                        border="1px solid gray"
                        padding="0 20px"
                      >
                        Beli Langsung
                      </Button>
                    </Link>
                    <Link to="cart">
                      <Button bgColor="#0080FF" color="white" padding="0 20px">
                        + Keranjang
                      </Button>
                    </Link>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Box>
  );
}
