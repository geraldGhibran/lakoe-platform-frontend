import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Box, Button, Flex, Image, Table, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '@/styles/styes.css';
import { useCartStore } from '@/store/cart-store';
import { useGetDummyProduct } from '../../hooks/useGetDummyProduct';

export default function DetailProduct() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  const { products, addItem, decreaseQuantity } = useCartStore();

  const { data: product } = useGetDummyProduct();

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
            <SwiperSlide className="rounded">
              <Image
                src={`${product?.image}`}
                // alt={`Slide ${index + 1}`}
              />
            </SwiperSlide>
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
            <SwiperSlide>
              <img
                src={`${product?.image}`}
                // alt={`Thumbnail ${index + 1}`}
              />
            </SwiperSlide>
            {/* ))} */}
          </Swiper>
        </Box>

        {/* Descriptions */}
        <Box gap="20px" padding="20px" w="full" display="flex" flexDir="column">
          <Text fontWeight="bold" fontSize="30px">
            {product?.title}
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
                  Rp. {product?.price}
                </Table.Cell>
              </Table.Row>
              <Table.Row borderBottom="1px solid gainsboro" bgColor="white">
                <Table.Cell borderColor="gainsboro" fontWeight="medium" w="1/3">
                  Pilih Warna
                </Table.Cell>
                <Table.Cell borderColor="gainsboro">
                  <Text mb="10px">2 Pilihan</Text>
                  <Flex gap="20px">
                    <Button
                      _focus={{
                        bgColor: 'red',
                        color: 'white',
                        border: '1px solid white',
                      }}
                      border="1px solid gray"
                      bgColor="white"
                      color="black"
                      padding="0 20px"
                    >
                      Merah
                    </Button>
                    <Button
                      _focus={{
                        bgColor: 'blue',
                        color: 'white',
                        border: '1px solid white',
                      }}
                      border="1px solid gray"
                      bgColor="white"
                      color="black"
                      padding="0 20px"
                    >
                      Biru
                    </Button>
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
                <Table.Cell borderBottom="1px solid gainsboro">
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
                      {products?.length == 0 ? 0 : products[0]?.quantity}
                    </Box>
                    <Button
                      onClick={() => {
                        if (product) {
                          addItem({ product, quantity: 1 });
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
                    >
                      +
                    </Button>
                  </Flex>
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
