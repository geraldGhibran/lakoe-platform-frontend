import { Box, Button, Heading, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

const ThankYouPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="gray.50"
      textAlign="center"
      px={4}
    >
      <Box bg="white" p={6} rounded="md" boxShadow="lg" width="100%" maxW="md">
        <Image
          src="https://via.placeholder.com/100" // Ganti dengan URL ikon amplop Anda
          alt="Success"
          mb={4}
          mx="auto"
        />
        <Heading fontSize="2xl" mb={2} fontFamily="cursive">
          Thank you, enjoy!
        </Heading>
        <Text fontSize="lg" mb={6}>
          We've sent the downloads to your inbox.
        </Text>
        <Button
          colorScheme="pink"
          size="lg"
          width="full"
          onClick={() => (window.location.href = '/')}
        >
          Back Home
        </Button>
        <Text fontSize="sm" mt={4}>
          If you have any issues,{' '}
          <Link color="blue.500" href="/contact">
            contact us
          </Link>
          .
        </Text>
      </Box>
    </Box>
  );
};

export default ThankYouPage;
