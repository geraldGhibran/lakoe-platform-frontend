import { Box, Button, Flex, Image, Input, Table, Text } from '@chakra-ui/react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { LuTrash2 } from 'react-icons/lu';
import { MdOutlineAttachMoney } from 'react-icons/md';

import { useCartStore } from '@/store/cart-store';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/features/add-other/format-currency';

export default function Cart() {
  const {
    products,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    totalPrice,
    productImage,
  } = useCartStore();
  const navigate = useNavigate();

  function test(e: { preventDefault: () => void }) {
    e.preventDefault();
    navigate('/checkout');
  }

  return (
    <form onSubmit={test} className="formulir">
      <Box
        overflow="hidden"
        rounded="2xl"
        border="1px solid gainsboro"
        width="3/4"
        pb="10px"
      >
        <Table.Root size="sm" unstyled width="full">
          <Table.Header>
            <Table.Row bgColor="white">
              <Table.ColumnHeader padding="20px" color="black">
                Product
              </Table.ColumnHeader>
              <Table.ColumnHeader padding="20px" color="black">
                Harga
              </Table.ColumnHeader>
              <Table.ColumnHeader padding="20px" color="black">
                Jumlah
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products.map((item) => (
              <Table.Row
                borderTop="1px solid gainsboro"
                _hover={{ bgColor: 'gainsboro' }}
                bgColor="white"
              >
                <Table.Cell padding="10px 20px">
                  <Flex gap="10px">
                    <Image boxSize="100px" src={productImage} />
                    <Box>
                      <Text fontSize="20px">{item?.variant?.name}</Text>
                    </Box>
                  </Flex>
                </Table.Cell>
                <Table.Cell padding="20px" fontSize="20px" textAlign="start">
                  {formatCurrency(item?.variant?.price * item?.quantity)}
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="10px" padding="10px" height="full" fontSize="20px">
                    <Button
                      onClick={() => removeItem(item?.variant?.id)}
                      display="flex"
                      bgColor="white"
                      justifyContent="center"
                      alignItems="center"
                      border="1px solid blue"
                      rounded="sm"
                      color="blue"
                    >
                      <LuTrash2 />
                    </Button>
                    <Button
                      onClick={() => decreaseQuantity(item?.variant?.id)}
                      display="flex"
                      bgColor="white"
                      color="black"
                      justifyContent="center"
                      alignItems="center"
                      border="1px solid blue"
                      rounded="sm"
                    >
                      -
                    </Button>
                    <Button
                      display="flex"
                      bgColor="white"
                      color="black"
                      alignItems="center"
                      fontSize="15px"
                      justifyContent="center"
                      border="1px solid gray"
                    >
                      {item?.quantity}
                    </Button>
                    <Button
                      onClick={() => increaseQuantity(item?.variant?.id)}
                      display="flex"
                      bgColor="white"
                      color="black"
                      justifyContent="center"
                      alignItems="center"
                      border="1px solid blue"
                      rounded="sm"
                    >
                      +
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex
          padding="20px"
          alignItems="center"
          gap="10px"
          borderTop="1px solid gainsboro"
          bgColor=""
          width="full"
        >
          <Text>Catatan </Text>:
          <Box position="relative" width="40%">
            <Input
              padding="20px"
              border="1px solid gainsboro"
              resize="none"
              placeholder="Tulis catatan / insturksi pesananmu"
            />
            <Text
              position="absolute"
              right="0"
              bottom="-22px"
              fontSize="12px"
              color="gray"
            >
              0 / 150
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box gap="20px" display="flex" flexDir="column" width="1/4">
        <Flex rounded="lg" border="1px solid blue" flexDir="column">
          <Link to="">
            <Flex
              cursor="pointer"
              alignItems="center"
              padding="15px"
              gap="10px"
              borderBottom="1px solid gainsboro"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="1px solid blue"
                rounded="full"
              >
                <MdOutlineAttachMoney color="blue" />
              </Box>
              <Text>Tagihan</Text>
              <IoIosArrowForward />
            </Flex>
          </Link>

          <Box display="flex" padding="20px" flexDir="column">
            <Text fontSize="20px" fontWeight="bold" py="10px">
              Ringkasan Pesanan
            </Text>
            <Table.Root size="sm" unstyled>
              <Table.Header>
                <Table.Row bgColor="white" borderBottom="1px solid gainsboro">
                  <Table.ColumnHeader py="10px" textAlign="start" color="black">
                    Subtotal
                  </Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end" color="black">
                    {formatCurrency(totalPrice)}
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row
                  fontSize="20px"
                  fontWeight="bold"
                  bgColor="white"
                  borderColor="red"
                >
                  <Table.Cell py="10px">Total</Table.Cell>
                  <Table.Cell textAlign="end">
                    {' '}
                    {formatCurrency(totalPrice)}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Flex>
        <Button
          type="submit"
          _active={{ shadow: 'sm' }}
          shadow="md"
          color="white"
          bgColor="blue"
        >
          <FaRegCheckCircle />
          <Text>Checkout</Text>
          <Text>(3)</Text>
        </Button>
      </Box>
    </form>
  );
}
