import { Icon } from '@iconify/react';
import { Box, Text, Stack } from '@chakra-ui/react';
export default function MessageContent() {
  return (
    <Box p={5} border={'1px solid #E6E6E6'} borderRadius={'10px'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Box>
          <Text fontSize={'16px'} fontWeight={'500'}>
            Pesan Promo
          </Text>
        </Box>
        <Stack direction={'row'}>
          <Box border={'1px solid #E6E6E6'} borderRadius={'50%'} p={2}>
            <Icon icon="bx:edit" />
          </Box>
          <Box border={'1px solid #E6E6E6'} borderRadius={'50%'} p={2}>
            <Icon icon="pajamas:remove" />
          </Box>
        </Stack>
      </Stack>
      <Text py={2}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum at possimus
        qui molestiae. Nemo dicta minima quia sed fuga! Ullam.
      </Text>
    </Box>
  );
}
