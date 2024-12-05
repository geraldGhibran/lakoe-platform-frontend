import {
  Box,
  Text,
  Stack,
  Input,
  Textarea,
  Button,
  Image,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function StoreInformation() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
  };
  return (
    <Box p={2}>
      <Text fontSize={'2xl'} fontWeight={'bold'} py={3}>
        Informasi Toko
      </Text>
      <Stack direction={'row'} w={'100%'} py={2}>
        <Box w={'50%'}>
          <Field label="Nama Toko" pb={3}>
            <Input placeholder="Masukan Nama Toko"></Input>
          </Field>
          <Field label="Slogan">
            <Input placeholder="Masukan Slogan"></Input>
          </Field>
        </Box>
        <Box w={'50%'}>
          <Field label="Deskripsi">
            <Textarea
              placeholder="Masukan deskripsi lengkap produk kamu"
              variant="outline"
              h={'120px'}
            />
          </Field>
          <Box my={5} display={'flex'} justifyContent={'end'}>
            <Button bgColor={'#0086B4'} borderRadius={'100px'} color={'white'}>
              Simpan
            </Button>
          </Box>
        </Box>
      </Stack>
      <Box>
        <Text fontSize={'2xl'} fontWeight={'bold'} py={3}>
          Logo Toko
        </Text>
        <Box
          border={'1px solid gray'}
          w={'200px'}
          h={'200px'}
          borderRadius={'10px'}
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="gray.100"
          position="relative"
        >
          {imagePreview ? (
            <>
              <Image
                src={imagePreview}
                alt="Preview"
                objectFit="cover"
                w="100%"
                h="100%"
              />
              <Box
                position="absolute"
                bottom={29}
                right={20}
                bgColor="white"
                p={2}
                borderRadius="full"
                boxShadow="sm"
                cursor="pointer"
                onClick={handleRemoveImage}
              >
                <Icon
                  icon="pajamas:remove"
                  color="red"
                  width="20px"
                  height="20px"
                />
              </Box>
            </>
          ) : (
            <Text color="gray.500">Preview Gambar</Text>
          )}
          <Box
            position={'absolute'}
            bgColor={'white'}
            right={5}
            bottom={7}
            borderRadius={'full'}
            p={2}
          >
            <Icon
              icon="uil:image-upload"
              color="green"
              width="20px"
              height="20px"
              aria-label="Upload Gambar"
              onClick={() => document.getElementById('image-upload')?.click()}
            />
          </Box>
        </Box>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </Box>
    </Box>
  );
}
