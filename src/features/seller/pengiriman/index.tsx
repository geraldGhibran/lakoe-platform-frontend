import 'leaflet/dist/leaflet.css';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

const switchOptions = [
  {
    id: '1',
    label: 'J&T EZ',
    description: 'Tersedia untuk COD',
    image:
      'https://1.bp.blogspot.com/-awkmdr1rWGI/YILHglBLkFI/AAAAAAAAIVw/lvFK6WSrOo0ki_-FU80DVNtDKR6eDwnWgCLcBGAsYHQ/s16000/jnt.png',
  },
  {
    id: '2',
    label: 'AnterAja',
    description: '',
    image:
      'https://1.bp.blogspot.com/-G2AH2_9Jhl0/YZgdJAJJqDI/AAAAAAAATh4/U9V2T2vsoNI5gnaiEtYnFcGyiK-dqIYJwCLcBGAsYHQ/s320/Anteraja.png',
  },
  {
    id: '3',
    label: 'JNE',
    description: 'Tersedia untuk COD',
    image: 'https://d290ny10omyv12.cloudfront.net/images/jne-large.png',
  },
];

const SwitchItem = ({
  id,
  label,
  description,
  image,
  isChecked,
  onChange,
}: {
  id: string;
  label: string;
  description?: string;
  image: string;
  isChecked: boolean;
  onChange: (id: string) => void;
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
    <Switch
      colorPalette="blue"
      checked={isChecked}
      onChange={() => onChange(id)}
    />
  </Flex>
);

export default function PengirimanSeller() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSwitchChange = (id: string) => {
    setSelectedValues((prevSelected) => {
      const updatedValues = prevSelected.includes(id)
        ? prevSelected.filter((value) => value !== id)
        : [...prevSelected, id];

      console.log('Selected Values:', updatedValues);
      return updatedValues;
    });
  };

  return (
    <Box bgColor="white">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
          <DialogTitle fontSize="md" fontWeight="bold">
            Pilih Metode Pengiriman
          </DialogTitle>
        </DialogHeader>
        <DialogBody color="#464646" display="flex" flexDir="column" gap="20px">
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

            <Box display="flex" flexDir="column" colorScheme="yellow">
              {switchOptions.map((option) => (
                <SwitchItem
                  key={option.id}
                  id={option.id}
                  label={option.label}
                  description={option.description}
                  image={option.image}
                  isChecked={selectedValues.includes(option.id)}
                  onChange={handleSwitchChange}
                />
              ))}
            </Box>
          </Flex>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogRoot>
    </Box>
  );
}
