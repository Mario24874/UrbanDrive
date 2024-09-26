// src/MapboxConfig.js
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export const initialMapConfig = {
  center: [-34.397, 150.644], // Initial center coordinates
  zoom: 10, // Initial zoom level
  style: 'mapbox://styles/mapbox/streets-v11', // Map style
};

export const addMarkersToMap = (map, markers) => {
  markers.forEach(marker => {
    new mapboxgl.Marker()
      .setLngLat([marker.lng, marker.lat])
      .addTo(map);
  });
};