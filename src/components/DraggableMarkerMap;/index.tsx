// src/components/DraggableMarkerMap.tsx
import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useLocationStore } from '@/store/location';
import { Box } from '@chakra-ui/react';

const DraggableMarkerMap: React.FC = () => {
  //   const [position, setPosition] = useState<L.LatLngLiteral>({ lat: -6.390110076310068, lng: 106.8498086885969 });
  const { position, setPosition } = useLocationStore();
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
      updateAddress(newPos.lat, newPos.lng);
    }
  };

  return (
    <Box width="100%" height="22vh" position="relative">
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
