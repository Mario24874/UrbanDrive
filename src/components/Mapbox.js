// src/components/Mapbox.js
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Mapbox = ({ initialCenter, markers = [] }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(initialCenter.lng);
  const [lat, setLat] = useState(initialCenter.lat);
  const [zoom, setZoom] = useState(initialCenter.zoom || 10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      markers.forEach(marker => {
        new mapboxgl.Marker()
          .setLngLat([marker.lng, marker.lat])
          .addTo(map.current);
      });
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lng, lat, zoom, markers]);

  return (
    <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '400px' }} />
  );
};

export default Mapbox;