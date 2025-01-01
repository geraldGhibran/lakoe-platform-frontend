import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Stack,
  Group,
  InputAddon,
  Flex,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useState, useEffect, useCallback } from 'react';
import { Tag } from '@/components/ui/tag';
import { Switch } from '@/components/ui/switch';
import { Field } from '@/components/ui/field';
import AddVariant from '../modal/add-variant';
import DeleteVariant from '../modal/delete-variant';

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
  onToggleVariantTypeCreate,
  isVariantTypeCreate,
  onSubmit,
}: VariantComponentProps) {
  const [dynamicVariant, setDynamicVariant] = useState<
    Record<string, string[]>
  >({});
  const [dynamicInput, setDynamicInput] = useState<Record<string, string>>({});
  const [activeVariants, setActiveVariants] = useState<string[]>([]);
  const [dynamicVariants, setDynamicVariants] = useState<string[]>([]);
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

  const generateCombinations = () => {
    const activeVariantItems = activeVariants.map((variant) => {
      return dynamicVariant[variant] || [];
    });

    return activeVariantItems.reduce<string[]>((acc, items) => {
      if (acc.length === 0) return items;
      const newCombinations: string[] = [];
      acc.forEach((prefix) =>
        items.forEach((item) => newCombinations.push(`${prefix},${item}`))
      );
      return newCombinations;
    }, []);
  };

  const combinations = generateCombinations();

  const preparePayload = useCallback(() => {
    const variants = [
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
  }, [dynamicVariant, combinationData]);

  useEffect(() => {
    const payload = preparePayload();
    onSubmit(payload.variants, payload.variantCombination);
  }, [preparePayload, onSubmit]);

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

  const handleDeleteVariant = (variantName: string) => {
    setDynamicVariants((prev) =>
      prev.filter((variant) => variant !== variantName)
    );
  };

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Box w={'100%'}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Text fontSize="2xl" mt={10} fontWeight="bold">
              Varian Produk
            </Text>
            <Text fontSize="14px">
              Tambah varian agar pembeli dapat memilih produk sesuai, yuk!
            </Text>
          </Box>
          <Box mt={10}>
            {isVariantTypeCreate ? (
              <></>
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
        {isVariantTypeCreate && (
          <>
            <>
              <>
                <HStack py={2}>
                  {dynamicVariants.map((variant) => (
                    <Button
                      key={variant}
                      bg={
                        activeVariants.includes(variant) ? 'cyan.500' : 'white'
                      }
                      color={
                        activeVariants.includes(variant) ? 'white' : 'black'
                      }
                      border={'1px solid black'}
                      borderRadius={'100px'}
                      onClick={() => handleVariantClick(variant)}
                    >
                      {variant}
                    </Button>
                  ))}
                  <AddVariant onAddVariant={handleAddVariant} />
                </HStack>
                {dynamicVariants.map((variant) =>
                  activeVariants.includes(variant) ? (
                    <>
                      <Box key={variant} mt={4}>
                        <Flex justify="space-between" align="center">
                          <Text py={2} fontWeight={500}>
                            {variant}
                          </Text>
                          <DeleteVariant
                            variantName={variant}
                            onDelete={handleDeleteVariant}
                          />
                        </Flex>
                        <Box
                          display="flex"
                          flexWrap="wrap"
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
                              onClick={() =>
                                handleRemoveDynamicTag(variant, index)
                              }
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
                    </>
                  ) : null
                )}
              </>
              <Stack direction={'row'} justifyContent={'space-between'} mt={10}>
                <Box>
                  <Text fontWeight={500} fontSize={'20px'}>
                    Daftar Varian
                  </Text>
                  <Text color={'#909090'}>
                    Kamu dapat mengatur harga stok dan SKU sekaligus
                  </Text>
                </Box>
                <Box></Box>
              </Stack>
            </>
          </>
        )}
        {combinations.map((combination, index) => (
          <>
            <Box key={index}>
              <HStack my={4}>
                <Text py={2} fontWeight={500}>
                  {combination}
                </Text>
                <Switch
                  colorPalette={'cyan'}
                  checked={combinationData[combination]?.isActive || false}
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
                <Box width="full">
                  <Field width="full" label="Harga">
                    <Group width="full" attached>
                      <InputAddon>Rp</InputAddon>
                      <Input
                        placeholder={`Masukan Harga untuk ${combination}`}
                        variant="outline"
                        width="full"
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
                <Box w="full">
                  <Field label="Stok Produk">
                    <Input
                      placeholder={`Masukan Stok untuk ${combination}`}
                      variant="outline"
                      width="full"
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
                <Box width="full">
                  <Field width="full" label="SKU (Stock Keeping Unit)">
                    <Input
                      placeholder={`Masukan SKU untuk ${combination}`}
                      variant="outline"
                      width="full"
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
                <Box width="full">
                  <Field width="full" label="Berat Produk">
                    <Group width="full" attached>
                      <Input
                        placeholder={`Masukan Berat untuk ${combination}`}
                        variant="outline"
                        width="full"
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
          </>
        ))}
      </Box>
    </Stack>
  );
}
