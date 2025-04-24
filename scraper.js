const axios = require('axios');
const fs = require('fs');

// CONFIGURA TU API KEY
const API_KEY = 'PLACES_API_KEY'; // Reemplaza con tu API Key de Google Places
const radius = 5000; // 5 km
const keywords = [
  'taller mecánico',
  'lavado de autos',
  'refaccionaria',
  'tienda automotriz'
];

const locations = [
  { name: 'Centro CDMX', lat: 19.4326, lng: -99.1332 },
//   { name: 'Polanco', lat: 19.4361, lng: -99.1972 },
//   { name: 'Coyoacán', lat: 19.3467, lng: -99.1617 },
//   { name: 'Tlalnepantla', lat: 19.5312, lng: -99.2101 }
];

// Buscar lugares cercanos
async function fetchPlaces(lat, lng, keyword, nextPageToken = null) {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${encodeURIComponent(keyword)}&key=${API_KEY}`;
  
  if (nextPageToken) {
    url += `&pagetoken=${nextPageToken}`;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Necesario por Google
  }

  const response = await axios.get(url);
  return response.data;
}

// Obtener detalles de cada negocio
async function fetchPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_phone_number,website&key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.result;
}

async function scrape() {
  let results = [];

  for (const location of locations) {
    for (const keyword of keywords) {
      console.log(`Buscando "${keyword}" en ${location.name}...`);
      let data = await fetchPlaces(location.lat, location.lng, keyword);

      data.results.forEach(place => {
        results.push({
          nombre: place.name,
          direccion: place.vicinity,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          rating: place.rating || 'N/A',
          tipo: keyword,
          zona: location.name,
          place_id: place.place_id
        });
      });

      while (data.next_page_token) {
        data = await fetchPlaces(location.lat, location.lng, keyword, data.next_page_token);
        data.results.forEach(place => {
          results.push({
            nombre: place.name,
            direccion: place.vicinity,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            rating: place.rating || 'N/A',
            tipo: keyword,
            zona: location.name,
            place_id: place.place_id
          });
        });
      }
    }
  }

  // Obtener datos de contacto (teléfono y sitio web)
  for (let i = 0; i < results.length; i++) {
    console.log(`Obteniendo detalles para: ${results[i].nombre}`);
    try {
      const details = await fetchPlaceDetails(results[i].place_id);
      results[i].telefono = details.formatted_phone_number || 'No disponible';
      results[i].website = details.website || 'No disponible';
    } catch (error) {
      console.error(`Error obteniendo detalles para ${results[i].nombre}:`, error.message);
      results[i].telefono = 'Error';
      results[i].website = 'Error';
    }
    await new Promise(resolve => setTimeout(resolve, 200)); // Espera para evitar bloqueo
  }

  // Eliminar place_id si no lo necesitas
  results.forEach(r => delete r.place_id);

  fs.writeFileSync('negocios_vehiculos_con_detalles.json', JSON.stringify(results, null, 2));
  console.log(`Datos completos guardados: ${results.length} negocios.`);
}

scrape().catch(err => console.error('Error:', err));
