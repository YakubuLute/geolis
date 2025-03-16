import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const LeafletMap = ({ initialCoordinates, polygonCoordinates }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Check if the DOM element exists
    if (!mapRef.current) return;

    // Set default coordinates if not provided
    const defaultCoords = [51.505, -0.09]; // London coordinates as fallback
    const coords = initialCoordinates || defaultCoords;

    // Clean up previous map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map
    const map = L.map(mapRef.current).setView(coords, 13);
    mapInstanceRef.current = map;

    // Base layers
    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // Set default base layer
    googleSat.addTo(map);

    // Create a feature group for storing draw vector objects
    const drawLayer = L.featureGroup().addTo(map);

    // Draw control options
    const drawControlOptions = {
      position: 'topright',
      draw: {
        polyline: true,
        polygon: true,
        circle: false,
        rectangle: true,
        marker: true,
      },
      edit: {
        featureGroup: drawLayer,
        remove: true
      }
    };

    // Add draw control to the map
    const drawControl = new L.Control.Draw(drawControlOptions);
    map.addControl(drawControl);

    // Handle draw created event
    map.on(L.Draw.Event.CREATED, function(event) {
      drawLayer.addLayer(event.layer);
    });

    // Add marker for initial coordinates if valid
    if (coords && coords.length >= 2) {
      L.marker(coords).addTo(map);
    }

    // Add polygon if coordinates are available and valid
    if (polygonCoordinates && Array.isArray(polygonCoordinates) && polygonCoordinates.length > 0) {
      L.polygon(polygonCoordinates).addTo(map);
    }

    // Layer control
    const baseLayers = {
      'Open Street Map': openStreetMap,
      'Google Streets': googleStreets,
      'Google Hybrid': googleHybrid,
      'Google Satellite': googleSat,
      'Google Terrain': googleTerrain
    };

    const overlays = {
      "Draw Layer": drawLayer,
    };

    L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialCoordinates, polygonCoordinates]);

  return <div ref={mapRef} style={{ height: '420px', width: '100%' }} />;
};

export default LeafletMap;