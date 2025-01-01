import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from '@/components/ui/dialog';
import { Box, HStack, Input, InputAddon } from '@chakra-ui/react';
import { useState } from 'react';

interface VariantData {
  sku: string;
  weight: number;
  stock: number;
  price: number;
  isActive: boolean;
}

type CombinationData = Record<string, VariantData>;

interface VariantMassEditModalProps {
  combinationData: CombinationData;
  setCombinationData: React.Dispatch<React.SetStateAction<CombinationData>>;
}

export default function VariantMassEditModal({
  setCombinationData,
}: VariantMassEditModalProps) {
  const [open, setOpen] = useState(false);

  // State untuk data mass edit
  const [massEditData, setMassEditData] = useState<Partial<VariantData>>({
    price: 0,
    stock: 0,
    sku: '',
    weight: 0,
  });

  const handleMassInputChange = (
    field: keyof VariantData,
    value: string | number
  ) => {
    setMassEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Apply mass changes to all combinations
  const applyToAll = () => {
    setCombinationData((prev) => {
      const updatedData = { ...prev };

      Object.keys(updatedData).forEach((combination) => {
        const updatedVariant = updatedData[combination];
        updatedData[combination] = {
          ...updatedVariant,
          price:
            massEditData.price !== undefined
              ? massEditData.price
              : updatedVariant.price,
          stock:
            massEditData.stock !== undefined
              ? massEditData.stock
              : updatedVariant.stock,
          sku: massEditData.sku || updatedVariant.sku,
          weight:
            massEditData.weight !== undefined
              ? massEditData.weight
              : updatedVariant.weight,
        };
      });

      return updatedData;
    });

    setOpen(false);
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline" bgColor="#0086B4" color="white">
          Atur Semua Kombinasi
        </Button>
      </DialogTrigger>
      <DialogContent minWidth="50%">
        <DialogHeader>
          <DialogTitle>Atur Semua Variant Kombinasi</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <HStack gap={5} mt={5}>
            <Box width="full">
              <Box fontWeight="600" pb={1}>
                Harga
              </Box>
              <HStack>
                <InputAddon>Rp</InputAddon>
                <Input
                  placeholder="Masukan harga untuk semua kombinasi"
                  value={massEditData.price}
                  onChange={(e) =>
                    handleMassInputChange('price', Number(e.target.value))
                  }
                />
              </HStack>
            </Box>
            <Box width="full">
              <Box fontWeight="600" pb={1}>
                Stok
              </Box>
              <Input
                placeholder="Masukan stok untuk semua kombinasi"
                value={massEditData.stock}
                onChange={(e) =>
                  handleMassInputChange('stock', Number(e.target.value))
                }
              />
            </Box>
          </HStack>
          <HStack gap={5} mt={5}>
            <Box width="full">
              <Box fontWeight="600" pb={1}>
                SKU
              </Box>
              <Input
                placeholder="Masukan SKU untuk semua kombinasi"
                value={massEditData.sku}
                onChange={(e) => handleMassInputChange('sku', e.target.value)}
              />
            </Box>
            <Box width="full">
              <Box fontWeight="600" pb={1}>
                Berat
              </Box>
              <HStack>
                <Input
                  placeholder="Masukan berat untuk semua kombinasi"
                  value={massEditData.weight}
                  onChange={(e) =>
                    handleMassInputChange('weight', Number(e.target.value))
                  }
                />
                <InputAddon>Gram</InputAddon>
              </HStack>
            </Box>
          </HStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batalkan
            </Button>
          </DialogActionTrigger>
          <Button
            bgColor="#0086B4"
            color="white"
            onClick={applyToAll}
            borderRadius="100px"
          >
            Terapkan
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
