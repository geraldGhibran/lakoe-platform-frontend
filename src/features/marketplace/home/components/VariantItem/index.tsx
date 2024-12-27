import { Tabs } from '@chakra-ui/react';
import React from 'react';

interface VariantItem {
  id: number;
  sku: string;
  name: string;
  weight: number;
  stock: number;
  price: number;
  is_active: boolean;
  product_id: number;
  image: string | null;
  invoiceId: number | null;
}

interface Props {
  variantItems: VariantItem[];
}

const VariantTabs: React.FC<Props> = ({ variantItems }) => {
  return (
    <Tabs.Root
      lazyMount
      unmountOnExit
      defaultValue={`tab-${variantItems[0]?.id || '0'}`}
    >
      <Tabs.List colorPalette={'blue'} bgColor={'blue'}>
        {variantItems.map((variant) => (
          <Tabs.Trigger key={variant.id} value={`tab-${variant.id}`}>
            {variant.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {variantItems.map((variant) => (
        <Tabs.Content key={variant.id} value={`tab-${variant.id}`}>
          <div>
            <p>
              <strong>SKU:</strong> {variant.sku}
            </p>
            <p>
              <strong>Weight:</strong> {variant.weight}g
            </p>
            <p>
              <strong>Stock:</strong> {variant.stock}
            </p>
            <p>
              <strong>Price:</strong>{' '}
              {variant.price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {variant.is_active ? 'Active' : 'Inactive'}
            </p>
            {variant.image && (
              <img
                src={variant.image}
                alt={`${variant.name}`}
                style={{ maxWidth: '100px', marginTop: '10px' }}
              />
            )}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default VariantTabs;
