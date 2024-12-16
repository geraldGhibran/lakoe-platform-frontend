import { TemplateMessage } from '@/types/template-message';
import { Box, Stack, Text } from '@chakra-ui/react';
import DialogEditTemplateMessage from '../form/DialogEditTemplateMessage';
import DialogDeleteTemplateMessage from '../form/DialogDeleteTemplateMessage';
export default function MessageContent({
  items,
}: {
  items: TemplateMessage[];
}) {
  return (
    <>
      {items?.map((item, index) => (
        <Box
          p={5}
          key={index}
          border={'1px solid #E6E6E6'}
          borderRadius={'10px'}
          mb={5}
        >
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Box>
              <Text fontSize={'16px'} fontWeight={'500'}>
                {item?.title}
              </Text>
            </Box>
            <Stack direction={'row'}>
              <Box border={'1px solid #E6E6E6'} borderRadius={'50%'} p={2}>
                <DialogEditTemplateMessage id={item?.id ?? 0} />
              </Box>
              <Box border={'1px solid #E6E6E6'} borderRadius={'50%'} p={2}>
                {/* <Icon icon="pajamas:remove" onClick={() => onDelete(item?.storeId ?? 0)} /> */}
                <DialogDeleteTemplateMessage id={item?.id ?? 0} />
              </Box>
            </Stack>
          </Stack>
          <Text py={2}>{item?.message}</Text>
        </Box>
      ))}
    </>
  );
}
