import { Text, Input } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icon } from '@iconify/react';
import { Field } from '@/components/ui/field';
import { useState } from 'react';

interface AddVariantProps {
  onAddVariant: (variantName: string) => void;
}

const AddVariant: React.FC<AddVariantProps> = ({ onAddVariant }) => {
  const [variantName, setVariantName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (variantName.trim()) {
      onAddVariant(variantName.trim());
      setVariantName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };
  return (
    <PopoverRoot lazyMount unmountOnExit>
      <PopoverTrigger asChild>
        <Button
          bg={'white'}
          color={'black'}
          border={'1px solid black'}
          borderRadius={'100px'}
        >
          <Icon icon="formkit:add" /> Tambah Varian
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <PopoverTitle fontWeight="medium">Tambahkan Varian</PopoverTitle>
          <Text my="4">
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              <Field label="Nama Varian">
                <Input
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                />
              </Field>
              <Button
                type="button"
                onClick={handleSubmit}
                variant={'outline'}
                mt={5}
                borderRadius={'full'}
                border={'solid 1px'}
              >
                Tambahkan
              </Button>
            </form>
          </Text>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default AddVariant;
