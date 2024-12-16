import { useAuthStore } from '@/store/auth';
import { Box, Stack, Text } from '@chakra-ui/react';
import { useGetTemplateMessage } from '../../hooks/useGetTemplateMessage';
import MessageContent from './Message';
import DialogAddTemplate from '../form/DialogAddTemplate';
export default function Message() {
  const { user } = useAuthStore();

  const { data: templateMessage } = useGetTemplateMessage(
    Number(user?.store?.id)
  );

  return (
    <Box>
      <Stack
        direction={'row'}
        w={'100%'}
        justifyContent={'space-between'}
        p={2}
      >
        <Text fontSize={'2xl'} fontWeight={'bold'} py={3}>
          Daftar Template Pesan
        </Text>
        <DialogAddTemplate />
      </Stack>
      <MessageContent items={templateMessage} />
    </Box>
  );
}
