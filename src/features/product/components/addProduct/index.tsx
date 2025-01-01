import {
  Box,
  Input,
  Text,
  Stack,
  Group,
  InputAddon,
  Textarea,
  Button,
  HStack,
  Image,
  Flex,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import VariantComponent from './variant';
import useAddProduct from '../hooks/use-add-product';
import { Icon } from '@iconify/react';
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    errors,
    isVariantTypeCreate,
    handleAddColorTag,
    handleRemoveColorTag,
    handleAddSizeTag,
    handleRemoveSizeTag,
    handleVariantTypeCreateToggle,
    colorTags,
    sizeTags,
    onSubmit,
    images,
    handleImageChange,
    handleRemoveImage,
    getSelectedPath,
    selectedCategory,
    selectedSubcategory,
    selectedSubSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedSubSubcategory,
    categoryCollection,
    updateVariantsAndCombination,
    isPending,
  } = useAddProduct();
  return (
    <Stack direction="row">
      <Box bg="gray.100" minH="270vh" w="100%">
        {isPending && (
          <Box
            position="fixed"
            top="0"
            left="0"
            w="100vw"
            h="100vh"
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="1000"
          >
            <VStack gap={4} color="white">
              <Spinner size="xl" color="white" />
              <Text fontSize="lg">Loading...</Text>
            </VStack>
          </Box>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            px={10}
            py={2}
            m="auto"
            width="100%"
            h={'450px'}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
          >
            <Text fontSize="2xl" mt={10} fontWeight="bold">
              Informasi Produk
            </Text>
            <Box pt={5}>
              <Field label="Nama produk">
                <Input
                  placeholder="masukan nama produk"
                  {...register('name')}
                  borderColor={errors.name ? 'red.500' : 'gray.200'}
                />
              </Field>
              {errors.name && (
                <Text color={'red.500'}>{errors.name.message as string}</Text>
              )}
            </Box>
            <Box pt={5}>
              <Stack>
                <Text fontSize="14px" fontWeight="500">
                  URL Halaman Checkout
                </Text>
                <Group attached>
                  <InputAddon>lakoe.store/</InputAddon>
                  <Input
                    placeholder="nama produk"
                    {...register('url')}
                    borderColor={errors.url ? 'red.500' : 'gray.200'}
                  />
                </Group>
                {errors.url && (
                  <Text color={'red.500'}>{errors.url.message as string}</Text>
                )}
              </Stack>
            </Box>
            <Box pt={5}>
              <Box>
                <SelectRoot
                  collection={categoryCollection}
                  size="sm"
                  width="100%"
                  closeOnSelect={false}
                >
                  <SelectLabel>Kategori</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText
                      placeholder={`${getSelectedPath() || 'Pilih Kategori'}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <Flex gap={4}>
                      <Box width="35%">
                        {categoryCollection.items.map((category) => (
                          <SelectItem
                            colorPalette={
                              selectedCategory?.value === category.value
                                ? 'cyan'
                                : undefined
                            }
                            item={category}
                            key={category.value}
                            onClick={() => {
                              setSelectedCategory(category);
                              setSelectedSubcategory(null);
                              setSelectedSubSubcategory(null);
                            }}
                          >
                            <Text>
                              {selectedCategory?.value === category.value ? (
                                <strong>{category.label}</strong>
                              ) : (
                                category.label
                              )}
                            </Text>
                          </SelectItem>
                        ))}
                      </Box>
                      {selectedCategory?.subcategories && (
                        <Box width="35%" borderLeft={'1px solid gray'}>
                          {selectedCategory.subcategories.map((subcategory) => (
                            <SelectItem
                              item={subcategory}
                              key={subcategory.value}
                              colorPalette={
                                selectedSubcategory?.value === subcategory.value
                                  ? 'blue'
                                  : undefined
                              }
                              onClick={() => {
                                setSelectedSubcategory(subcategory);
                                setSelectedSubSubcategory(null);
                              }}
                            >
                              <Text>
                                {selectedSubcategory?.value ===
                                subcategory.value ? (
                                  <strong>{subcategory.label}</strong>
                                ) : (
                                  subcategory.label
                                )}
                              </Text>
                            </SelectItem>
                          ))}
                        </Box>
                      )}
                      {selectedSubcategory?.subcategories && (
                        <Box width="35%" borderLeft={'1px solid gray'}>
                          {selectedSubcategory.subcategories.map(
                            (subSubcategory) => (
                              <SelectItem
                                colorPalette={
                                  selectedSubSubcategory?.value ===
                                  subSubcategory.value
                                    ? 'blue'
                                    : undefined
                                }
                                item={subSubcategory}
                                key={subSubcategory.value}
                                onClick={() =>
                                  setSelectedSubSubcategory(subSubcategory)
                                }
                              >
                                <Text>
                                  {selectedSubSubcategory?.value ===
                                  subSubcategory.value ? (
                                    <strong>{subSubcategory.label}</strong>
                                  ) : (
                                    subSubcategory.label
                                  )}
                                  <input
                                    type="hidden"
                                    {...register('categories_id', {
                                      valueAsNumber: true,
                                    })}
                                    value={subSubcategory.id}
                                  />
                                </Text>
                              </SelectItem>
                            )
                          )}
                        </Box>
                      )}
                    </Flex>
                  </SelectContent>
                </SelectRoot>
              </Box>
              {errors.categories_id && (
                <Text color={'red.500'}>
                  {errors.categories_id.message as string}
                </Text>
              )}
            </Box>
          </Box>
          <Box
            px={10}
            py={5}
            m="auto"
            width="100%"
            bg="white"
            my={5}
            boxShadow="md"
            borderRadius="lg"
          >
            <Text fontSize="2xl" mt={10} fontWeight="bold">
              Detail Produk
            </Text>
            <Box pt={5}>
              <Field label="Deskripsi" helperText="Max 3000 characters.">
                <Textarea
                  placeholder="Masukan deskripsi lengkap produk kamu"
                  variant="outline"
                  h={'200px'}
                  {...register('description')}
                  borderColor={errors.description ? 'red.500' : 'gray.200'}
                />
              </Field>
              {errors.description && (
                <Text color={'red.500'}>
                  {errors.description.message as string}
                </Text>
              )}
            </Box>
            <Box pt={5}>
              <Text fontSize="14px" fontWeight="500" pb={1}>
                Foto Produk
              </Text>
              <Stack direction="row">
                <div>
                  <Box display="flex" flexWrap="wrap" gap="10px">
                    {images.map((image, index) => (
                      <Box
                        key={index}
                        width="188px"
                        height="200px"
                        borderWidth="2px"
                        borderStyle="dashed"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        overflow="hidden"
                      >
                        <Box position="relative" width="100%" height="100%">
                          <Image
                            src={image.preview || ''}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            alt={`Image ${index + 1}`}
                          />
                          <Button
                            size="sm"
                            colorScheme="red"
                            position="absolute"
                            top="10px"
                            right="10px"
                            onClick={() => handleRemoveImage(index)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box textAlign="center" position="relative" mt="10px">
                    <Box
                      width="188px"
                      height="200px"
                      borderWidth="2px"
                      borderStyle="dashed"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      overflow="hidden"
                    >
                      <Box
                        bgColor={'white'}
                        borderRadius={'full'}
                        p={2}
                        onClick={() =>
                          document.getElementById('fileInput')?.click()
                        }
                      >
                        <Icon
                          icon="hugeicons:image-upload"
                          color="green"
                          width="60px"
                          height="60px"
                          aria-label="Upload Gambar"
                        />
                        <Input
                          id="fileInput"
                          multiple
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Box>
                    </Box>
                  </Box>
                </div>
              </Stack>
            </Box>
          </Box>
          <Box
            px={10}
            py={5}
            mb={5}
            m="auto"
            width="100%"
            bg="white"
            boxShadow="md"
            borderRadius="lg"
          >
            <VariantComponent
              colorTags={colorTags}
              sizeTags={sizeTags}
              onAddColorTag={handleAddColorTag}
              onRemoveColorTag={handleRemoveColorTag}
              onAddSizeTag={handleAddSizeTag}
              onRemoveSizeTag={handleRemoveSizeTag}
              onToggleVariantTypeCreate={handleVariantTypeCreateToggle}
              isVariantTypeCreate={isVariantTypeCreate}
              onSubmit={updateVariantsAndCombination}
            />
          </Box>
          <Box
            px={10}
            py={1}
            m="auto"
            width="100%"
            h={350}
            bg="white"
            my={5}
            boxShadow="md"
            borderRadius="lg"
          >
            <Text fontSize="2xl" mt={10} mb={5} fontWeight="bold">
              Harga
            </Text>
            <Text fontSize="14px" mb={2} fontWeight="500">
              Harga
            </Text>
            <Stack>
              <Group attached>
                <InputAddon>Rp</InputAddon>
                <Input
                  placeholder="Masukan harga satuan barang"
                  {...register('price')}
                  borderColor={errors.price ? 'red.500' : 'gray.200'}
                />
              </Group>
              {errors.price && (
                <Text color={'red.500'}>{errors.price.message as string}</Text>
              )}
              <Text fontSize="14px" mb={1} mt={2} fontWeight="500">
                Minimal Pembelian
              </Text>
              <Group attached>
                <Input
                  placeholder="minimum order"
                  {...register('minimum_order')}
                  borderColor={errors.minimum_order ? 'red.500' : 'gray.200'}
                />
                <InputAddon>Produk</InputAddon>
              </Group>
              {errors.minimum_order && (
                <Text color={'red.500'}>
                  {errors.minimum_order.message as string}
                </Text>
              )}
            </Stack>
          </Box>
          <Box
            px={10}
            py={5}
            m="auto"
            width="100%"
            bg="white"
            my={5}
            boxShadow="md"
            borderRadius="lg"
          >
            <Text fontSize="2xl" mt={5} mb={5} fontWeight="bold">
              Berat & Pengiriman
            </Text>
            <HStack gap="20" width="100%" mt={5}>
              <Box>
                <Text fontSize="14px" mb={1} mt={2} fontWeight="500">
                  Ukuran Produk
                </Text>
                <Group attached w={'100%'}>
                  <Input
                    placeholder="panjang"
                    {...register('length')}
                    borderColor={errors.length ? 'red.500' : 'gray.200'}
                  />
                  <InputAddon>cm</InputAddon>
                </Group>
                {errors.length && (
                  <Text color={'red.500'}>
                    {errors.length.message as string}
                  </Text>
                )}
              </Box>
              <Box>
                <Group attached w={'100%'} mt={8}>
                  <Input placeholder="Lebar" {...register('width')} />
                  borderColor={errors.width ? 'red.500' : 'gray.200'}
                  <InputAddon>cm</InputAddon>
                </Group>
                {errors.width && (
                  <Text color={'red.500'}>
                    {errors.width.message as string}
                  </Text>
                )}
              </Box>
              <Box>
                <Group attached w={'100%'} mt={8}>
                  <Input
                    placeholder="Tinggi"
                    {...register('height')}
                    borderColor={errors.height ? 'red.500' : 'gray.200'}
                  />
                  <InputAddon>cm</InputAddon>
                </Group>
                {errors.height && (
                  <Text color={'red.500'}>
                    {errors.height.message as string}
                  </Text>
                )}
              </Box>
            </HStack>
          </Box>
          <Box
            p={10}
            m="auto"
            width="100%"
            bg="white"
            my={5}
            boxShadow="md"
            borderRadius="lg"
          >
            <Stack
              direction="row"
              justifyContent={'space-between'}
              width="100%"
            >
              <Box></Box>
              <Box>
                <Button
                  width={'100px'}
                  bg={'white'}
                  color={'black'}
                  border={'1px solid gray'}
                  borderRadius={'100px'}
                >
                  Batal
                </Button>
                <Button
                  ml={1}
                  type="submit"
                  width={'100px'}
                  bg={'#0086B4'}
                  color={'white'}
                  border={'1px solid gray'}
                  borderRadius={'100px'}
                >
                  Simpan
                </Button>
              </Box>
            </Stack>
          </Box>
        </form>
      </Box>
    </Stack>
  );
}
