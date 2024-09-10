import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const LeafletMap = ({ initialCoordinates, polygonCoordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create map
    const map = L.map(mapRef.current).setView(initialCoordinates, 13);

    // Base layers
    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
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

    // Add marker for initial coordinates
    L.marker(initialCoordinates).addTo(map);

    // Add polygon if coordinates are available
    if (polygonCoordinates && polygonCoordinates.length > 0) {
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

    L.control.layers(baseLayers, overlays).addTo(map);

    // Cleanup function
    return () => {
      map.remove();
    };
  }, [initialCoordinates, polygonCoordinates]);

  return <div ref={mapRef} style={{ height: '420px', width: '100%' }} />;
};

export default LeafletMap;