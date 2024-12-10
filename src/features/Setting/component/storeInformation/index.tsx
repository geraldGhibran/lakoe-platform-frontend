import { Field } from '@/components/ui/field';
import { useAuthStore } from '@/store/auth';
import {
  Box,
  Button,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useHandleEditProfile } from '../../hooks/useEditStore';
import { useGetStoreDetail } from '../../hooks/useGetStoreDetail';

export default function StoreInformation() {
  const { user } = useAuthStore();

  const { data: storeDetail, isLoading } = useGetStoreDetail(Number(user?.id));

  const {
    onSubmit,
    register,
    errors,
    handleFileChange,
    imagePreview,
    setImagePreview,
  } = useHandleEditProfile();

  if (isLoading) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          color="blue.500"
          css={{ '--spinner-track-color': 'colors.gray.200' }}
          size="lg"
        />
      </Box>
    );
  }

  if (!storeDetail) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Store not found</Text>
      </Box>
    );
  }

  const handleRemoveImage = () => {
    setImagePreview(null);
  };
  return (
    <Box p={2}>
      <Text fontSize={'2xl'} fontWeight={'bold'} py={3}>
        {storeDetail.name}
      </Text>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Stack direction={'row'} w={'100%'} py={2}>
          <Box w={'50%'}>
            <Field label="Nama Toko" pb={3}>
              <Input
                defaultValue={storeDetail.name}
                placeholder="Masukan Nama Toko"
                {...register('name')}
              ></Input>
            </Field>
            {errors.name && (
              <Text color={'red.500'}>{errors.name.message as string}</Text>
            )}
            <Field label="Slogan">
              <Input
                defaultValue={storeDetail.slogan}
                placeholder="Masukan Slogan"
                {...register('slogan')}
              ></Input>
            </Field>
            {errors.slogan && (
              <Text color={'red.500'}>{errors.slogan.message as string}</Text>
            )}
          </Box>
          <Box w={'50%'}>
            <Field label="Deskripsi">
              <Textarea
                defaultValue={storeDetail.description}
                placeholder="Masukan deskripsi lengkap produk kamu"
                variant="outline"
                h={'120px'}
                {...register('description')}
              />
            </Field>
            {errors.description && (
              <Text color={'red.500'}>
                {errors.description.message as string}
              </Text>
            )}

            <Box my={5} display={'flex'} justifyContent={'end'}>
              <Button
                bgColor={'#0086B4'}
                borderRadius={'100px'}
                color={'white'}
                type="submit"
              >
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
              <Image
                src={storeDetail.logo_img}
                alt="Preview"
                objectFit="cover"
                w="100%"
                h="100%"
              />
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
                onClick={() => document.getElementById('logo-upload')?.click()}
              />
            </Box>
          </Box>
          <Input
            id="logo-upload"
            type="file"
            accept="image/*"
            {...register('logo_img', {
              onChange: (e) => {
                if (e.target.files?.[0]) {
                  handleFileChange('logo_img', e.target.files[0]);
                }
              },
            })}
            display="none"
          />
        </Box>
      </form>
    </Box>
  );
}
