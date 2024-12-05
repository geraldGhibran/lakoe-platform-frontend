import SideBar from '@/components/leftbar';
import { Box, Flex, Tabs, Text } from '@chakra-ui/react';
import StoreInformation from '../../component/storeInformation';
import Message from '../../component/tamplateMessage';
import { useState } from 'react';
import LocationMain from '../../component/location/main-location';

export default function StoreSetting() {
  const [value, setValue] = useState<string | null>('first');

  return (
    <Flex direction={'row'}>
      <Box width={'30%'}>
        <SideBar />
      </Box>
      <Box width={'60%'} p={5} bg={'#F8F8F8'}>
        <Tabs.Root
          value={value}
          flex={1}
          onValueChange={(e) => setValue(e.value)}
          bg={'white'}
          p={5}
          variant="plain"
        >
          <Text py={3} fontWeight={'bold'} fontSize={'2xl'}>
            Feysen Store
          </Text>
          <Tabs.List display={'flex'} w={'100%'}>
            <Tabs.Trigger
              value="first"
              textAlign={'center'}
              justifyContent={'center'}
              py={2}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              Informasi
            </Tabs.Trigger>
            <Tabs.Trigger
              value="second"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              Lokasi
            </Tabs.Trigger>
            <Tabs.Trigger
              value="third"
              textAlign={'center'}
              py={2}
              justifyContent={'center'}
              _selected={{
                borderBottomColor: '#0086B4',
                color: '#0086B4',
              }}
              borderBottom="4px solid transparent"
            >
              Tamplate Pesan
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="first">
            <StoreInformation />
          </Tabs.Content>
          <Tabs.Content value="second">
            <LocationMain />
          </Tabs.Content>
          <Tabs.Content value="third">
            <Message />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Flex>
  );
}
