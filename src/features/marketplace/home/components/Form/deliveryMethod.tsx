import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { useCostRateStore } from '@/store/cost-rate';
import { Pricing } from '@/types/pricing';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';

export default function DeliveryMethod({
  onSubmit,
  rates,
}: {
  onSubmit: () => void;
  rates: { pricing: { pricing: Pricing[] } };
}) {
  const { setRatesCourier, setIsSelected, setCost } = useCostRateStore();

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <form onSubmit={onSubmit}>
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
              type="submit"
            >
              Pilih Metode Pengiriman
            </Button>
          </form>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <Button
              variant="outline"
              bgColor={'#0086B4'}
              borderRadius={'100px'}
              color={'white'}
              type="submit"
            >
              Pilih Metode Pengiriman
            </Button>
          </DialogHeader>
          <DialogBody
            color="#464646"
            display="flex"
            flexDir="column"
            gap="20px"
          >
            <Box display="flex" flexDir="column" gap="10px">
              <Text>
                Pengiriman di atas jam 3 sore berpotensi dikirim besok
              </Text>
            </Box>

            <Flex flexDir="column" gap="10px">
              {rates?.pricing?.pricing?.map((rate) => (
                <>
                  <RadioGroup
                    display="flex"
                    flexDir="column"
                    defaultValue="1"
                    variant="subtle"
                    colorPalette="blue"
                  >
                    <DialogTrigger asChild>
                      <Radio
                        _hover={{ bgColor: 'blue.300' }}
                        rounded="md"
                        padding="20px"
                        value="0"
                        onClick={() => {
                          setRatesCourier(rate);
                          setCost(rate.price);
                          setIsSelected(true);
                        }}
                      >
                        <Flex alignItems="center">
                          {/* <Image
                          width="100px"
                          src="https://1.bp.blogspot.com/-awkmdr1rWGI/YILHglBLkFI/AAAAAAAAIVw/lvFK6WSrOo0ki_-FU80DVNtDKR6eDwnWgCLcBGAsYHQ/s16000/jnt.png"
                        /> */}
                          <Text fontWeight="medium" fontSize="20px">
                            {rate.courier_name} {rate.courier_service_code} (
                            {rate.shipment_duration_range}) hari{' '}
                          </Text>
                          <Text fontSize="20px" fontWeight="bold">
                            {' '}
                            RP. {rate.price}
                          </Text>
                        </Flex>
                        <Text color="gray">
                          {rate.available_for_cash_on_delivery && 'COD'}
                        </Text>
                      </Radio>
                    </DialogTrigger>
                  </RadioGroup>
                </>
              ))}
            </Flex>
          </DialogBody>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
