import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useGetStoreDetail } from '@/features/Setting/hooks/useGetStoreDetail';
import { useAuthStore } from '@/store/auth';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { useEditShipmentStoreById } from './hooks/use-edit-shipment';

const switchOptions = [
  {
    id: '1',
    label: 'J&T EZ',
    description: 'Tersedia untuk COD',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/9/99/Gojek_logo_2019.svg',
  },
  {
    id: '2',
    label: 'AnterAja',
    description: '',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Grab_%28application%29_logo.svg/320px-Grab_%28application%29_logo.svg.png',
  },
  {
    id: '3',
    label: 'JNE',
    description: 'Tersedia untuk COD',
    image: 'https://d290ny10omyv12.cloudfront.net/images/jne-large.png',
  },
  {
    id: '4',
    label: 'J&T EZ',
    description: 'Tersedia untuk COD',
    image:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnQ_u7_qEjguu0ZqqKrXJKRfi4PHRc5fLw0aCXnYwf-yygcnoXw0yDcIo8A-J_wwQyFH1cSZX9TnLcqOKsjCnKiKmBxkoXvznGOYsY-y6qvVHQSgKKA2qSGraF6x1xRFlP12sqb3ZvUDXUNmV1rSZvePdhXUp98t_uBBBogyC8efTM-KIX-zqNtgdO/s320/GKL5_SiCepat%20Express%20-%20Koleksilogo.com.jpg',
  },
  {
    id: '5',
    label: 'AnterAja',
    description: '',
    image:
      'https://1.bp.blogspot.com/-G2AH2_9Jhl0/YZgdJAJJqDI/AAAAAAAATh4/U9V2T2vsoNI5gnaiEtYnFcGyiK-dqIYJwCLcBGAsYHQ/s320/Anteraja.png',
  },
];

interface PayloadCourier {
  id: number;
  is_active: boolean;
}

const SwitchItem = ({
  label,
  description,
  image,
  isChecked,
  onClick,
}: {
  id: PayloadCourier;
  label: string;
  description?: string;
  image: string;
  isChecked: boolean;
  onClick: () => void;
}) => (
  <Flex
    _hover={{ bgColor: 'blue.300' }}
    rounded="md"
    justify="space-between"
    padding="20px"
    alignItems="center"
  >
    <Flex alignItems="center">
      <Image width="100px" src={image} alt={label} />
      <Text fontWeight="medium" fontSize="20px" ml="10px">
        {label}
      </Text>
    </Flex>
    {description && <Text color="gray">{description}</Text>}
    <Button type="submit">
      <Switch colorPalette="blue" checked={isChecked} onClick={onClick} />
    </Button>
  </Flex>
);

export default function ShipmentSeller() {
  const { onSubmit, setValue } = useEditShipmentStoreById();

  const { user } = useAuthStore();

  const { data: courierStore } = useGetStoreDetail(Number(user?.id));

  return (
    <Box bgColor="white">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
          <DialogTitle fontSize="md" fontWeight="bold">
            Pilih Metode Pengiriman
          </DialogTitle>
        </DialogHeader>
        <DialogBody color="#464646" display="flex" flexDir="column" gap="20px">
          <Flex flexDir="column" gap="10px">
            <Box display="flex" flexDir="column" colorScheme="yellow">
              <form onSubmit={onSubmit}>
                {courierStore?.couriers.map((option, index) => (
                  <SwitchItem
                    key={option.id}
                    id={{ id: option.id, is_active: option.is_active }}
                    label={option.courier_code}
                    description={option.courier_service_name}
                    image={switchOptions[index]?.image}
                    isChecked={option.is_active}
                    onClick={() => {
                      setValue('id', option.id);
                      setValue('is_active', !option.is_active);
                    }}
                  />
                ))}
              </form>
            </Box>
          </Flex>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogRoot>
    </Box>
  );
}
