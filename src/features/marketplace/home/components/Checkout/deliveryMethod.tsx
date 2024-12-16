import 'leaflet/dist/leaflet.css';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react';

export default function DeliveryMethod() {
  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button
            _active={{ shadow: 'xs' }}
            shadow="sm"
            fontSize="14px"
            fontWeight="medium"
            color="white"
            height="30px"
            borderColor="transparent"
            bgColor="blue"
            padding="20px"
            variant="outline"
          >
            Pilih Metode Pengiriman
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <DialogTitle fontSize="md" fontWeight="bold">
              Pilih Metode Pengiriman
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            color="#464646"
            display="flex"
            flexDir="column"
            gap="20px"
          >
            {/* Close Form */}

            <Flex flexDir="column" gap="10px">
              <Box display="flex" flexDir="column" gap="10px">
                <Text fontSize="20px" fontWeight="bold">
                  Reguler (2 -4) hari
                </Text>
                <Text>
                  Pengiriman di atas jam 3 sore berpotensi dikirim besok
                </Text>
              </Box>
              {/* Radio */}

              <RadioGroup
                display="flex"
                flexDir="column"
                defaultValue="1"
                variant="subtle"
                colorPalette="yellow"
              >
                <Radio
                  _hover={{ bgColor: 'blue.300' }}
                  rounded="md"
                  padding="20px"
                  value="1"
                >
                  <Flex alignItems="center">
                    <Image
                      width="100px"
                      src="https://1.bp.blogspot.com/-awkmdr1rWGI/YILHglBLkFI/AAAAAAAAIVw/lvFK6WSrOo0ki_-FU80DVNtDKR6eDwnWgCLcBGAsYHQ/s16000/jnt.png"
                    />
                    <Text fontWeight="medium" fontSize="20px">
                      J&T EZ
                    </Text>
                  </Flex>
                  <Text color="gray">Tersedia untuk COD</Text>
                </Radio>
                <Radio
                  _hover={{ bgColor: 'blue.300' }}
                  rounded="md"
                  padding="20px"
                  value="2"
                >
                  <Flex alignItems="center">
                    <Image
                      width="100px"
                      src="https://1.bp.blogspot.com/-G2AH2_9Jhl0/YZgdJAJJqDI/AAAAAAAATh4/U9V2T2vsoNI5gnaiEtYnFcGyiK-dqIYJwCLcBGAsYHQ/s320/Anteraja.png"
                    />
                    <Text fontWeight="medium" fontSize="20px">
                      AnterAja
                    </Text>
                  </Flex>
                </Radio>
                <Radio
                  _hover={{ bgColor: 'blue.300' }}
                  rounded="md"
                  padding="20px"
                  value="3"
                >
                  <Flex alignItems="center">
                    <Image
                      width="100px"
                      src="https://d290ny10omyv12.cloudfront.net/images/jne-large.png"
                    />
                    <Text fontWeight="medium" fontSize="20px">
                      JNE
                    </Text>
                  </Flex>
                  <Text color="gray">Tersedia untuk COD</Text>
                </Radio>
              </RadioGroup>
            </Flex>
          </DialogBody>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
