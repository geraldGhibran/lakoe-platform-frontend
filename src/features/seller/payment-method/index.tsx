import { Box, Flex, Image, Text } from '@chakra-ui/react';

export default function PaymentMethod() {
  return (
    <Box display="flex" gap="20px" flexDir="column">
      <Text fontSize="20px" fontWeight="bold">
        Pembayaran
      </Text>
      <Flex gap="10px" rounded="md">
        {/* E-Wallet */}
        <Box
          shadow="md"
          rounded="sm"
          overflow="hidden"
          bgColor="white"
          width="1/2"
        >
          <Text
            padding="15px"
            fontWeight="medium"
            fontSize="15px"
            borderBottom="1px solid gainsboro"
          >
            E-Wallet
          </Text>
          <Flex gap="10px" padding="20px">
            <Image
              boxSize="40px"
              objectFit="contain"
              rounded="md"
              shadow="sm"
              src="https://1.bp.blogspot.com/-rmLjPMKtx7k/XnK070LoSRI/AAAAAAAASbs/i2kIFlIzh0MUpnLZzeFoXgYN-a0EpZRvwCLcBGAsYHQ/s1600/OVO.png"
            />
            <Image
              boxSize="40px"
              objectFit="contain"
              rounded="md"
              shadow="sm"
              src="https://logowik.com/content/uploads/images/permata-bank3459.jpg"
            />
          </Flex>
        </Box>

        {/* Akun Virtual */}
        <Box
          shadow="md"
          rounded="sm"
          overflow="hidden"
          bgColor="white"
          width="1/2"
        >
          <Text
            padding="15px"
            fontWeight="medium"
            fontSize="15px"
            borderBottom="1px solid gainsboro"
          >
            Akun Virtual
          </Text>
          <Flex gap="10px" padding="20px">
            <Image
              boxSize="40px"
              objectFit="contain"
              rounded="md"
              shadow="sm"
              src="https://1.bp.blogspot.com/-rmLjPMKtx7k/XnK070LoSRI/AAAAAAAASbs/i2kIFlIzh0MUpnLZzeFoXgYN-a0EpZRvwCLcBGAsYHQ/s1600/OVO.png"
            />
            <Image
              boxSize="40px"
              objectFit="contain"
              rounded="md"
              shadow="sm"
              src="https://logowik.com/content/uploads/images/permata-bank3459.jpg"
            />
            <Image
              boxSize="40px"
              objectFit="contain"
              rounded="md"
              shadow="sm"
              src="https://th.bing.com/th/id/R.c14259eb75c4bfb13197ea71251a70f2?rik=uY5VOX7Hr%2bEjhQ&riu=http%3a%2f%2freprime.id%2faplikasi-absensi-online%2fface-recognition-dan-human-detection%2fimg%2ficon%2fmandiri_logo.png&ehk=uz8OBrdh2fEaW2x2fjnxe9JsZvnKVVMjQxZBhdnLuxM%3d&risl=&pid=ImgRaw&r=0"
            />
            <Image
              boxSize="40px"
              objectFit="contain"
              rounded="md"
              shadow="sm"
              src="https://th.bing.com/th/id/OIP.8kr2k27j1xdMm0MDMbPPqwHaE8?rs=1&pid=ImgDetMain"
            />
            <Image
              boxSize="40px"
              objectFit="contain"
              rounded="md"
              shadow="sm"
              src="https://i.pinimg.com/originals/36/38/43/36384348ef9d7bfff66da6da9e975d56.png"
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
