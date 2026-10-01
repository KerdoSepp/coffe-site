const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';

function getAddressPart(address, keys) {
  return keys.map((key) => address[key]).find(Boolean) ?? '';
}

function normalizeResult(result) {
  const details = result.address ?? {};
  const road = getAddressPart(details, [
    'road',
    'pedestrian',
    'residential',
    'footway',
  ]);
  const houseNumber = details.house_number ?? '';

  return {
    street: [road, houseNumber].filter(Boolean).join(' '),
    city: getAddressPart(details, [
      'city',
      'town',
      'village',
      'municipality',
      'county',
    ]),
    postalCode: details.postcode ?? '',
    countryCode: details.country_code?.toUpperCase() ?? 'EE',
    formattedAddress: result.display_name,
    placeId: `osm-${result.osm_type}-${result.osm_id}`,
    coordinates: {
      lat: Number(result.lat),
      lng: Number(result.lon),
    },
    validated: true,
  };
}

async function request(path, params, signal) {
  const url = new URL(path, NOMINATIM_URL);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const response = await fetch(url, {
    signal,
    headers: { 'Accept-Language': 'et,en' },
  });

  if (!response.ok) {
    throw new Error('The address service is temporarily unavailable.');
  }

  return response.json();
}

export async function geocodeAddress(address, signal) {
  const query = `${address.street}, ${address.city} ${address.postalCode}, Estonia`;
  const results = await request(
    '/search',
    {
      q: query,
      format: 'jsonv2',
      addressdetails: '1',
      countrycodes: 'ee',
      limit: '1',
    },
    signal
  );

  return results[0] ? normalizeResult(results[0]) : null;
}

export async function reverseGeocode(coordinates, signal) {
  const result = await request(
    '/reverse',
    {
      lat: String(coordinates.lat),
      lon: String(coordinates.lng),
      format: 'jsonv2',
      addressdetails: '1',
      zoom: '18',
    },
    signal
  );

  return normalizeResult(result);
}

export function distanceInKm(first, second) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const latitudeDistance = toRadians(second.lat - first.lat);
  const longitudeDistance = toRadians(second.lng - first.lng);
  const firstLatitude = toRadians(first.lat);
  const secondLatitude = toRadians(second.lat);
  const haversine =
    Math.sin(latitudeDistance / 2) ** 2 +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDistance / 2) ** 2;

  return (
    earthRadiusKm *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}
