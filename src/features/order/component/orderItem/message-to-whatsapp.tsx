import { Store } from '@/types/store';
import { TemplateMessage } from '@/types/template-message';
import { Box, Stack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
// import DialogEditTemplateMessage from '../form/DialogEditTemplateMessage';
// import DialogDeleteTemplateMessage from '../form/DialogDeleteTemplateMessage';

interface Product {
  name: string;
}

export default function MessageToWhatsapp({
  receiver_phone,
  items,
  receiver_name,
  Product,
  store,
}: {
  items: TemplateMessage[] | TemplateMessage;
  receiver_phone: string;
  receiver_name: string;
  Product: Product[];
  store: Store;
}) {
  const message = Array.isArray(items) ? items[0]?.message : items?.message;
  const nama_customer = receiver_name;
  const nama_produk = Product[0]?.name;
  const nama_toko = store.name;

  const formattedMessage = (message ?? '')
    .replace('{{nama_customer}}', nama_customer)
    .replace('{{nama_produk}}', nama_produk || '')
    .replace('{{nama_toko}}', nama_toko);

  const formatted_phone = receiver_phone.replace(/^0/, '62');
  const encodedMessage = encodeURIComponent(formattedMessage || '');
  const whatsappLink = `https://web.whatsapp.com/send/?phone=${formatted_phone}&text=${encodedMessage}`;

  return (
    <>
      {(Array.isArray(items) ? items : [items])?.map((item, index) => (
        <Box
          p={5}
          key={index}
          border={'1px solid #E6E6E6'}
          borderRadius={'10px'}
          mb={5}
        >
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box mb={2}>
              <Text fontSize={'16px'} fontWeight={'500'}>
                {item?.title}
              </Text>
            </Box>
            <Box border={'1px solid #E6E6E6'} borderRadius={'50%'} p={2}>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Icon icon="bxl:whatsapp" />
              </a>
            </Box>
          </Stack>
          <Text py={2}>{item?.message}</Text>
        </Box>
      ))}
    </>
  );
}
