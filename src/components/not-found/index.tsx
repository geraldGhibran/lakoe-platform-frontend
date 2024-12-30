import { Box, Button, Image } from '@chakra-ui/react';
import file from '@/assets/images/page-not-found.svg';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <Box pos="relative">
      <Link to="/dashboard">
        <Button margin="20px" pos="absolute">
          <FaHome />
          Kembali
        </Button>
      </Link>
      <Image height="100vh" objectFit="contain" width="100vw" src={file} />
    </Box>
  );
}
