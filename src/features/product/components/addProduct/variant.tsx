import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Stack,
  Image,
  Group,
  InputAddon,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Tag } from '@/components/ui/tag';
import { Switch } from '@/components/ui/switch';
import VariantModal from '../modal/variant';
import { Field } from '@/components/ui/field';

interface VariantComponentProps {
  colorTags: string[];
  sizeTags: string[];
  onAddColorTag: (tag: string) => void;
  onRemoveColorTag: (index: number) => void;
  onAddSizeTag: (tag: string) => void;
  onRemoveSizeTag: (index: number) => void;
  onToggleVariantTypeCreate: () => void;
  isVariantTypeCreate: boolean;
}

export default function VariantComponent({
  colorTags,
  sizeTags,
  onAddColorTag,
  onRemoveColorTag,
  onAddSizeTag,
  onRemoveSizeTag,
  onToggleVariantTypeCreate,
  isVariantTypeCreate,
}: VariantComponentProps) {
  const [inputWarna, setInputWarna] = useState('');
  const [inputUkuran, setInputUkuran] = useState('');
  const [activeVariants, setActiveVariants] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string | null;
  }>({});

  const handleInputChangeWarna = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputWarna(event.target.value);
  };

  const combinations = colorTags.flatMap((color) =>
    sizeTags.map((size) => `${color}-${size}`)
  );

  const handleInputChangeUkuran = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputUkuran(event.target.value);
  };

  const handleKeyDownWarna = (event: KeyboardEvent<HTMLInputElement>): void => {
    const value = inputWarna.trim();
    if (event.key === 'Enter' && value) {
      onAddColorTag(value);
      setInputWarna('');
      event.preventDefault();
    }
  };

  const handleKeyDownUkuran = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    const value = inputUkuran.trim();
    if (event.key === 'Enter' && value) {
      onAddSizeTag(value);
      setInputUkuran('');
      event.preventDefault();
    }
  };

  const handleVariantClick = (variant: string): void => {
    setActiveVariants((prev) =>
      prev.includes(variant)
        ? prev.filter((item) => item !== variant)
        : [...prev, variant]
    );
  };

  const handleImageChange =
    (tag: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreviews((prev) => ({
            ...prev,
            [tag]: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    };

  const handleRemoveImage = (tag: string) => () => {
    setImagePreviews((prev) => {
      const newState = { ...prev };
      delete newState[tag];
      return newState;
    });
  };

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Box>
        <Text fontSize="2xl" mt={10} fontWeight="bold">
          Varian Produk
        </Text>
        <Text fontSize="14px">
          Tambah varian agar pembeli dapat memilih produk sesuai, yuk!
        </Text>
        {isVariantTypeCreate && (
          <>
            <HStack py={2}>
              <Button
                bg={activeVariants.includes('warna') ? 'cyan.500' : 'white'}
                color={activeVariants.includes('warna') ? 'white' : 'black'}
                border={'1px solid black'}
                borderRadius={'100px'}
                onClick={() => handleVariantClick('warna')}
              >
                Warna
              </Button>
              <Button
                bg={activeVariants.includes('ukuran') ? 'cyan.500' : 'white'}
                color={activeVariants.includes('ukuran') ? 'white' : 'black'}
                border={'1px solid black'}
                borderRadius={'100px'}
                onClick={() => handleVariantClick('ukuran')}
              >
                Ukuran
              </Button>
              <Button
                bg={'white'}
                color={'black'}
                border={'1px solid black'}
                borderRadius={'100px'}
              >
                <Icon icon="formkit:add" /> Tambah Varian
              </Button>
            </HStack>

            {activeVariants.includes('warna') && (
              <>
                <Text py={2} fontWeight={500}>
                  Warna
                </Text>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  w={'900px'}
                  alignItems="center"
                  padding="2px"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                >
                  {colorTags.map((tag, index) => (
                    <Tag
                      key={index}
                      size="md"
                      p={1}
                      m={2}
                      variant="solid"
                      bgColor={'gray.200'}
                      color={'black'}
                      marginRight={2}
                      marginBottom={2}
                      closable
                      onClick={() => onRemoveColorTag(index)}
                    >
                      {tag}
                    </Tag>
                  ))}
                  <Input
                    autoFocus
                    variant={'subtle'}
                    placeholder="Masukan Varian Warna..."
                    value={inputWarna}
                    onChange={handleInputChangeWarna}
                    onKeyDown={handleKeyDownWarna}
                    flex={1}
                    minWidth="120px"
                  />
                </Box>
                <Box py={5}>
                  <Switch colorPalette={'cyan'}>Gunakan Foto Variant</Switch>
                  <HStack wrap="wrap" align="flex-start">
                    {colorTags.map((tag) => (
                      <Box key={tag} py={3}>
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
                          {imagePreviews[tag] ? (
                            <>
                              <Image
                                src={imagePreviews[tag]}
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
                                onClick={handleRemoveImage(tag)}
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
                            <Box
                              w="100%"
                              h="100%"
                              bg="gray.200"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Icon
                                icon="uil:image-upload"
                                color="gray"
                                width="30px"
                              />
                            </Box>
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
                              onClick={() =>
                                document
                                  .getElementById(`upload-${tag}`)
                                  ?.click()
                              }
                            />
                          </Box>
                        </Box>
                        <Input
                          id={`upload-${tag}`}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange(tag)}
                          display="none"
                        />
                      </Box>
                    ))}
                  </HStack>
                </Box>
              </>
            )}
            {activeVariants.includes('ukuran') && (
              <>
                <Text py={2} fontWeight={500}>
                  Ukuran
                </Text>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  w={'900px'}
                  alignItems="center"
                  padding="2px"
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                >
                  {sizeTags.map((tag, index) => (
                    <Tag
                      key={index}
                      size="md"
                      p={1}
                      m={2}
                      variant="solid"
                      bgColor={'gray.200'}
                      color={'black'}
                      marginRight={2}
                      marginBottom={2}
                      closable
                      onClick={() => onRemoveSizeTag(index)}
                    >
                      {tag}
                    </Tag>
                  ))}
                  <Input
                    autoFocus
                    variant={'subtle'}
                    placeholder="Masukan Varian Ukuran..."
                    value={inputUkuran}
                    onChange={handleInputChangeUkuran}
                    onKeyDown={handleKeyDownUkuran}
                    flex={1}
                    minWidth="120px"
                  />
                </Box>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  mt={10}
                  w={'900px'}
                >
                  <Box>
                    <Text fontWeight={500} fontSize={'20px'}>
                      Daftar Varian
                    </Text>
                    <Text color={'#909090'}>
                      Kamu dapat mengatur harga stok dan SKU sekaligus
                    </Text>
                  </Box>
                  <Box>
                    <VariantModal />
                  </Box>
                </Stack>
                {combinations.map((combination, index) => (
                  <Box key={index}>
                    <HStack my={4}>
                      <Text py={2} fontWeight={500}>
                        {combination}
                      </Text>
                      <Switch colorPalette={'cyan'}>Aktif</Switch>
                    </HStack>
                    <HStack gap="10" width="full">
                      <Box>
                        <Field label="Harga">
                          <Group attached>
                            <InputAddon>Rp</InputAddon>
                            <Input
                              placeholder="Masukan Harga"
                              variant="outline"
                              width="350px"
                            />
                          </Group>
                        </Field>
                      </Box>
                      <Box>
                        <Field label="Stok Produk">
                          <Input
                            placeholder="Masukan Stok"
                            variant="outline"
                            width="410px"
                          />
                        </Field>
                      </Box>
                    </HStack>
                    <HStack gap="10" width="full" my={4}>
                      <Box>
                        <Field label="SKU(Stock Keeping Unit)">
                          <Input
                            placeholder="Masukan SkU"
                            variant="outline"
                            width="395px"
                          />
                        </Field>
                      </Box>
                      <Box>
                        <Field label="Berat Produk">
                          <Group attached>
                            <Input
                              placeholder="Masukan SKU"
                              variant="outline"
                              width="350px"
                            />
                            <InputAddon>Gram</InputAddon>
                          </Group>
                        </Field>
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </>
            )}
          </>
        )}
      </Box>
      <Box mt={10}>
        {isVariantTypeCreate ? (
          <Button
            bg={'white'}
            ml={'-150px'}
            color={'black'}
            border={'1px solid black'}
            borderRadius={'100px'}
          >
            <Icon icon="mynaui:trash" />
            Hapus Variant
          </Button>
        ) : (
          <Button
            bg={'white'}
            color={'black'}
            border={'1px solid black'}
            borderRadius={'100px'}
            onClick={onToggleVariantTypeCreate}
          >
            <Icon icon="formkit:add" />
            Buat Tipe Varian
          </Button>
        )}
      </Box>
    </Stack>
  );
}
