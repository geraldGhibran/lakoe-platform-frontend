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
import 'leaflet/dist/leaflet.css';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useShipmentAddress } from '../../hooks/use-shipment-address';
import { usePinpoint } from '@/store/pinpoint';

export default function PopUpLocation() {
  const { onMarkerDragEnd, position, address, markerRef } =
    useShipmentAddress();

  const { setPinpoint } = usePinpoint();

  const handlePinpoint = () => {
    setPinpoint(true);
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
              <Box width="100%" height="20vh" position="relative">
                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={position}
                    draggable={true}
                    eventHandlers={{ dragend: onMarkerDragEnd }}
                    ref={markerRef}
                  >
                    <Popup>
                      <div>
                        Latitude: {position.lat.toFixed(4)}, Longitude:{' '}
                        {position.lng.toFixed(4)}
                        <br />
                        Address: {address}
                      </div>
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
            <DialogActionTrigger asChild>
              <Box width="1/2">
                <Button
                  width="full"
                  padding="20px"
                  color="white"
                  bgColor="#2E4399"
                  onClick={() => handlePinpoint()}
                >
                  Pilih Lokasi
                </Button>
              </Box>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
