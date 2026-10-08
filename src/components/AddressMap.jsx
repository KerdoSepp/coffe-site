import { useEffect, useMemo } from 'react';
import {
  Circle,
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

import { coffeeShop } from '../data/Shop.js';

const destinationIcon = L.divIcon({
  className: '',
  html: '<span class="address-map-pin address-map-pin--destination"></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 34],
});

const shopIcon = L.divIcon({
  className: '',
  html: '<span class="address-map-pin address-map-pin--shop">☕</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

function MapEvents({ onSelect }) {
  useMapEvents({
    click(event) {
      onSelect({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });

  return null;
}

function RecenterMap({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([coordinates.lat, coordinates.lng], 16, { duration: 0.5 });
  }, [coordinates, map]);

  return null;
}

export default function AddressMap({ coordinates, onSelect }) {
  const center = useMemo(
    () => [coordinates.lat, coordinates.lng],
    [coordinates]
  );

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom
      className="dark-map h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={[coffeeShop.coordinates.lat, coffeeShop.coordinates.lng]}
        radius={coffeeShop.deliveryRadiusKm * 1000}
        pathOptions={{
          color: '#c67c4e',
          fillColor: '#c67c4e',
          fillOpacity: 0.08,
        }}
      />
      <Marker
        position={[coffeeShop.coordinates.lat, coffeeShop.coordinates.lng]}
        icon={shopIcon}
        interactive={false}
      />
      <Marker
        position={center}
        icon={destinationIcon}
        draggable
        eventHandlers={{
          dragend(event) {
            const position = event.target.getLatLng();
            onSelect({ lat: position.lat, lng: position.lng });
          },
        }}
      />
      <MapEvents onSelect={onSelect} />
      <RecenterMap coordinates={coordinates} />
    </MapContainer>
  );
}
