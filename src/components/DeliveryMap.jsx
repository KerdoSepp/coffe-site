import { useEffect, useMemo } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';

import bikeIcon from '../assets/figma/delivery-bike.png';
import { coffeeShop } from '../data/Shop.js';

const shopIcon = L.divIcon({
  className: '',
  html: '<span class="address-map-pin address-map-pin--shop">☕</span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const destinationIcon = L.divIcon({
  className: '',
  html: '<span class="address-map-pin address-map-pin--destination"></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 34],
});

const courierIcon = L.divIcon({
  className: '',
  html: `<span class="delivery-map-courier"><img src="${bikeIcon}" alt="" /></span>`,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

function getRoutePoints(destination) {
  const shop = coffeeShop.coordinates;
  const latitudeDistance = destination.lat - shop.lat;
  const longitudeDistance = destination.lng - shop.lng;

  return [
    [shop.lat, shop.lng],
    [
      shop.lat + latitudeDistance * 0.35 + longitudeDistance * 0.08,
      shop.lng + longitudeDistance * 0.35 - latitudeDistance * 0.08,
    ],
    [
      shop.lat + latitudeDistance * 0.7 - longitudeDistance * 0.05,
      shop.lng + longitudeDistance * 0.7 + latitudeDistance * 0.05,
    ],
    [destination.lat, destination.lng],
  ];
}

function FitRoute({ routePoints, recenterSignal }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(L.latLngBounds(routePoints), {
      paddingTopLeft: [52, 90],
      paddingBottomRight: [52, 120],
      maxZoom: 16,
      animate: true,
    });
  }, [map, recenterSignal, routePoints]);

  return null;
}

export default function DeliveryMap({ destination, recenterSignal }) {
  const routePoints = useMemo(() => getRoutePoints(destination), [destination]);
  const courierPosition = routePoints[2];

  return (
    <MapContainer
      center={[coffeeShop.coordinates.lat, coffeeShop.coordinates.lng]}
      zoom={15}
      zoomControl={false}
      scrollWheelZoom
      className="dark-map h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
        positions={routePoints}
        pathOptions={{ color: '#c67c4e', weight: 5, opacity: 0.9 }}
      />
      <Marker
        position={[coffeeShop.coordinates.lat, coffeeShop.coordinates.lng]}
        icon={shopIcon}
        title={coffeeShop.name}
      />
      <Marker
        position={[destination.lat, destination.lng]}
        icon={destinationIcon}
        title="Delivery destination"
      />
      <Marker
        position={courierPosition}
        icon={courierIcon}
        title="Courier location"
      />
      <FitRoute routePoints={routePoints} recenterSignal={recenterSignal} />
    </MapContainer>
  );
}
