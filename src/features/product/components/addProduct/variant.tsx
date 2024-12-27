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
  Flex,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { Tag } from '@/components/ui/tag';
import { Switch } from '@/components/ui/switch';
import VariantModal from '../modal/variant';
import { Field } from '@/components/ui/field';
import AddVariant from '../modal/add-variant';

type Variant = {
  name: string;
  variantItem: string[];
};

type VariantCombination = {
  name: string;
  sku: string;
  weight: number;
  stock: number;
  price: number;
  isActive: boolean;
};

interface VariantComponentProps {
  colorTags: string[];
  sizeTags: string[];
  onAddColorTag: (tag: string) => void;
  onRemoveColorTag: (index: number) => void;
  onAddSizeTag: (tag: string) => void;
  onRemoveSizeTag: (index: number) => void;
  onToggleVariantTypeCreate: () => void;
  isVariantTypeCreate: boolean;
  onSubmit: (
    variants: Variant[],
    variantCombination: VariantCombination[]
  ) => void;
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
  onSubmit,
}: VariantComponentProps) {
  const [dynamicVariant, setDynamicVariant] = useState<
    Record<string, string[]>
  >({});
  const [dynamicInput, setDynamicInput] = useState<Record<string, string>>({});
  const [inputWarna, setInputWarna] = useState('');
  const [inputUkuran, setInputUkuran] = useState('');
  const [activeVariants, setActiveVariants] = useState<string[]>([]);
  const [dynamicVariants, setDynamicVariants] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string | null;
  }>({});
  const [combinationData, setCombinationData] = useState<
    Record<
      string,
      {
        sku: string;
        weight: number;
        stock: number;
        price: number;
        isActive: boolean;
      }
    >
  >({});

  const handleInputChangeWarna = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputWarna(event.target.value);
  };

  const generateCombinations = () => {
    return colorTags.flatMap((color) =>
      sizeTags.flatMap((size) => {
        const dynamicCombinations = Object.entries(dynamicVariant).reduce(
          (acc, [, values]) =>
            acc.flatMap((combo) => values.map((value) => `${combo}${value}`)),
          ['']
        );

        return dynamicCombinations.map((dynamicCombo) =>
          [color, size, dynamicCombo]
            .filter((part) => part.trim() !== '')
            .join(',')
        );
      })
    );
  };

  const combinations = generateCombinations();

  const preparePayload = () => {
    const variants = [
      { name: 'warna', variantItem: colorTags },
      { name: 'ukuran', variantItem: sizeTags },
      ...Object.entries(dynamicVariant).map(([name, variantItem]) => ({
        name,
        variantItem,
      })),
    ];
    const variantCombination = Object.entries(combinationData).map(
      ([combination, data]) => ({
        name: combination,
        sku: data.sku,
        weight: data.weight,
        stock: data.stock,
        price: data.price,
        isActive: data.isActive,
      })
    );

    return { variants, variantCombination };
  };

  useEffect(() => {
    const payload = preparePayload();
    onSubmit(payload.variants, payload.variantCombination);
  }, [onSubmit]);

  const handleInputChangeUkuran = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputUkuran(event.target.value);
  };

  const handleDynamicInputChange = (variant: string, value: string) => {
    setDynamicInput((prev) => ({
      ...prev,
      [variant]: value,
    }));
  };

  const handleDynamicKeyDown = (
    variant: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && dynamicInput[variant]?.trim()) {
      e.preventDefault();
      handleAddDynamicTag(variant, dynamicInput[variant]);
      setDynamicInput((prev) => ({
        ...prev,
        [variant]: '',
      }));
    }
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

  const handleAddDynamicTag = (variant: string, tag: string): void => {
    if (tag.trim()) {
      setDynamicVariant((prev) => ({
        ...prev,
        [variant]: [...(prev[variant] || []), tag],
      }));
    }
  };

  const handleRemoveDynamicTag = (variant: string, index: number): void => {
    setDynamicVariant((prev) => {
      const updatedTags = [...(prev[variant] || [])];
      updatedTags.splice(index, 1);
      return { ...prev, [variant]: updatedTags };
    });
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

  const handleAddVariant = (variantName: string) => {
    setDynamicVariants((prev) => [...prev, variantName]);
    setActiveVariants((prev) => [...prev, variantName]);
  };

  const handleCombinationChange = (
    combination: string,
    field: keyof (typeof combinationData)[string],
    value: string | number | boolean
  ) => {
    setCombinationData((prev) => ({
      ...prev,
      [combination]: {
        ...prev[combination],
        [field]: value,
      },
    }));
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
              {dynamicVariants.map((variant) => (
                <Button
                  key={variant}
                  bg={activeVariants.includes(variant) ? 'cyan.500' : 'white'}
                  color={activeVariants.includes(variant) ? 'white' : 'black'}
                  border={'1px solid black'}
                  borderRadius={'100px'}
                  onClick={() => handleVariantClick(variant)}
                >
                  {variant}
                </Button>
              ))}
              <AddVariant onAddVariant={handleAddVariant} />
            </HStack>

            {activeVariants.includes('warna') && (
              <>
                <Text py={2} fontWeight={500}>
                  Warna
                </Text>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  w={'810px'}
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
            {dynamicVariants.map((variant) =>
              activeVariants.includes(variant) ? (
                <Box key={variant} mt={4}>
                  <Flex justify="space-between" align="center">
                    <Text py={2} fontWeight={500}>
                      {variant}
                    </Text>
                  </Flex>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    w={'810px'}
                    alignItems="center"
                    padding="2px"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                  >
                    {dynamicVariant[variant]?.map((tag, index) => (
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
                        onClick={() => handleRemoveDynamicTag(variant, index)}
                      >
                        {tag}
                      </Tag>
                    ))}
                    <Input
                      autoFocus
                      variant="subtle"
                      flex={1}
                      minWidth="120px"
                      placeholder={`Masukan ${variant}...`}
                      value={dynamicInput[variant] || ''}
                      onChange={(e) =>
                        handleDynamicInputChange(variant, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleDynamicKeyDown(variant, e);
                        }
                      }}
                    />
                  </Box>
                </Box>
              ) : null
            )}
            {activeVariants.includes('ukuran') && (
              <>
                <Text py={2} fontWeight={500}>
                  Ukuran
                </Text>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  w={'100%'}
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
                  w={'810px'}
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
                      <Switch
                        colorPalette={'cyan'}
                        checked={
                          combinationData[combination]?.isActive || false
                        }
                        onChange={(e) =>
                          handleCombinationChange(
                            combination,
                            'isActive',
                            (e.target as HTMLInputElement).checked
                          )
                        }
                      >
                        Aktif
                      </Switch>
                    </HStack>
                    <HStack gap="2" width="full">
                      <Box>
                        <Field label="Harga">
                          <Group attached>
                            <InputAddon>Rp</InputAddon>
                            <Input
                              placeholder={`Masukan Harga untuk ${combination}`}
                              variant="outline"
                              width="350px"
                              value={combinationData[combination]?.price || ''}
                              onChange={(e) =>
                                handleCombinationChange(
                                  combination,
                                  'price',
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Group>
                        </Field>
                      </Box>
                      <Box>
                        <Field label="Stok Produk">
                          <Input
                            placeholder={`Masukan Stok untuk ${combination}`}
                            variant="outline"
                            width="410px"
                            value={combinationData[combination]?.stock || ''}
                            onChange={(e) =>
                              handleCombinationChange(
                                combination,
                                'stock',
                                Number(e.target.value)
                              )
                            }
                          />
                        </Field>
                      </Box>
                    </HStack>
                    <HStack gap="2" width="full" my={4}>
                      <Box>
                        <Field label="SKU (Stock Keeping Unit)">
                          <Input
                            placeholder={`Masukan SKU untuk ${combination}`}
                            variant="outline"
                            width="395px"
                            value={combinationData[combination]?.sku || ''}
                            onChange={(e) =>
                              handleCombinationChange(
                                combination,
                                'sku',
                                e.target.value
                              )
                            }
                          />
                        </Field>
                      </Box>
                      <Box>
                        <Field label="Berat Produk">
                          <Group attached>
                            <Input
                              placeholder={`Masukan Berat untuk ${combination}`}
                              variant="outline"
                              width="350px"
                              value={combinationData[combination]?.weight || ''}
                              onChange={(e) =>
                                handleCombinationChange(
                                  combination,
                                  'weight',
                                  Number(e.target.value)
                                )
                              }
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
