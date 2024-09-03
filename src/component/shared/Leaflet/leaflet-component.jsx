import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ initialCoordinates, polygonCoordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create map
    const map = L.map(mapRef.current).setView(initialCoordinates, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add marker for initial coordinates
    L.marker(initialCoordinates).addTo(map);

    // Add polygon if coordinates are available
    if (polygonCoordinates && polygonCoordinates.length > 0) {
      L.polygon(polygonCoordinates).addTo(map);
    }

    // Cleanup function
    return () => {
      map.remove();
    };
  }, [initialCoordinates, polygonCoordinates]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default LeafletMap;