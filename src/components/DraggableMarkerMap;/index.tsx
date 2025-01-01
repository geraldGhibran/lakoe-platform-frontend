// src/components/DraggableMarkerMap.tsx
import { useAddLocation } from '@/features/Setting/hooks/useAddLocation';
import { useLocationStore } from '@/store/location';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const DraggableMarkerMap: React.FC = () => {
  const { position, setPosition } = useLocationStore();
  const { setValue } = useAddLocation();
  const [address, setAddress] = useState<string>('Loading address...');
  const markerRef = useRef<L.Marker<[number | number]>>(null);

  const updateAddress = async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/reverse',
        {
          params: {
            lat: lat,
            lon: lng,
            format: 'json',
          },
        }
      );
      const data = response.data;
      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding data:', error);
      setAddress('Error fetching address');
    }
  };

  const onMarkerDragEnd = () => {
    if (markerRef.current != null) {
      const newPos = markerRef.current.getLatLng();
      setPosition(newPos);
      setValue('latitude', newPos.lat);
      setValue('longitude', newPos.lng);
      updateAddress(newPos.lat, newPos.lng);
    }
  };

  return (
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
              Alamat: {address}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default DraggableMarkerMap;
