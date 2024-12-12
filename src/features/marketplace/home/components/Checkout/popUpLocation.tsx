import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Button, Flex, HStack } from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function PopUpLocation() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return null;
  };

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button
            fontSize="14px"
            fontWeight="medium"
            color="blue"
            height="30px"
            bgColor="white"
            padding="20px"
            border="1px solid blue"
            variant="outline"
          >
            Tandai Pinpoint
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <DialogTitle fontSize="md" fontWeight="bold">
              Tandai Pinpoint
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
              <Box bgColor="#E5F2FF" padding="20px">
                <Flex gap="10px" color="#909090">
                  <IoInformationCircleOutline color="blue" size="20px" />
                  Pastikan pinpoint lokasi kamu sama dengan alamat yang kamu
                  tulis
                </Flex>
              </Box>
              {/* Map */}
              <Box height="200px" overflow="hidden" shadow="sm" rounded="2xl">
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ width: '100%', height: '400px' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapEvents />
                  <Marker position={position}>
                    <Popup>
                      Latitude: {position[0]}, Longitude: {position[1]}
                    </Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button
                width="1/2"
                border="1px solid"
                color="gray"
                borderColor="#D5D5D5"
                padding="20px"
                variant="outline"
              >
                Kembali
              </Button>
            </DialogActionTrigger>
            <Box width="1/2">
              <Button
                width="full"
                padding="20px"
                color="white"
                bgColor="#2E4399"
              >
                Pilih Lokasi
              </Button>
            </Box>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
