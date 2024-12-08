import { Box, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from '@iconify/react';
import axios from 'axios';

const LocationTracker = ({
  setPosition,
  setAddress,
}: {
  setPosition: (pos: [number, number]) => void;
  setAddress: (address: string) => void;
}) => {
  const map = useMap();

  const updatePosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          map.setView([latitude, longitude], 13);

          localStorage.setItem(
            'userLocation',
            JSON.stringify([latitude, longitude])
          );
          axios
            .get('https://nominatim.openstreetmap.org/reverse', {
              params: {
                lat: latitude,
                lon: longitude,
                format: 'json',
              },
            })
            .then((response) => {
              const data = response.data;
              if (data && data.display_name) {
                setAddress(data.display_name);
                localStorage.setItem('userAddress', data.display_name);
              }
            })
            .catch((error) =>
              console.error('Error fetching reverse geocoding data:', error)
            );
        },
        (error) => {
          console.error('Error getting geolocation: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {}, []);

  return (
    <Button
      position="absolute"
      top="10px"
      right="10px"
      zIndex={1000}
      bgColor={'white'}
      shadow={'md'}
      color={'black'}
      onClick={updatePosition}
    >
      <Icon icon="ic:outline-my-location" />
      Menuju Lokasi Saya
    </Button>
  );
};

export default function LocationConfig({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lon: number) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    const savedAddress = localStorage.getItem('userAddress');

    if (savedLocation) {
      const parsedLocation = JSON.parse(savedLocation);
      setPosition(parsedLocation);
      onLocationChange(parsedLocation[0], parsedLocation[1]);
    }

    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, [onLocationChange]);

  return (
    <Box width="100%" height="22vh" position="relative">
      <MapContainer
        center={position || [-63.816973, 106.7495893]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        dragging={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <Marker position={position}>
            <Popup>
              <div>
                Lokasi pengguna: {position[0].toFixed(4)},{' '}
                {position[1].toFixed(4)}
                <br />
                Alamat: {address || 'Mencari alamat...'}
              </div>
            </Popup>
          </Marker>
        )}
        <LocationTracker setPosition={setPosition} setAddress={setAddress} />
      </MapContainer>
    </Box>
  );
}
