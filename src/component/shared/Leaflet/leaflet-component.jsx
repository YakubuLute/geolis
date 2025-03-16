import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const LeafletMap = ({ initialCoordinates, polygonCoordinates }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Validate coordinates
  const isValidLatLng = (coords) => {
    return Array.isArray(coords) && 
           coords.length >= 2 && 
           typeof coords[0] === 'number' && 
           typeof coords[1] === 'number' &&
           !isNaN(coords[0]) && 
           !isNaN(coords[1]);
  };

  // Validate polygon coordinates
  const isValidPolygon = (polygon) => {
    return Array.isArray(polygon) && 
           polygon.length > 0 && 
           polygon.every(point => isValidLatLng(point));
  };

  useEffect(() => {
    // Ensure the component is mounted and the ref is available
    if (!mapRef.current) return;

    // Set default coordinates if not provided or invalid
    const defaultCoords = [51.505, -0.09]; // London coordinates as fallback
    const coords = isValidLatLng(initialCoordinates) ? initialCoordinates : defaultCoords;

    // Clean up any existing map instance to prevent duplicate initialization
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Wait for the DOM to be fully ready
    setTimeout(() => {
      try {
        // Create map with validated coordinates
        const map = L.map(mapRef.current).setView(coords, 13);
        mapInstanceRef.current = map;
        setMapInitialized(true);

        // Base layers with HTTPS URLs
        const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        });

        // Use HTTPS for all Google layers to avoid mixed content issues
        const googleSat = L.tileLayer('https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['0', '1', '2', '3']
        });

        const googleStreets = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['0', '1', '2', '3']
        });

        const googleHybrid = L.tileLayer('https://mt{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['0', '1', '2', '3']
        });

        const googleTerrain = L.tileLayer('https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['0', '1', '2', '3']
        });

        // Add default base layer
        googleSat.addTo(map);

        // Create a feature group for the draw layer
        const drawLayer = new L.FeatureGroup();
        map.addLayer(drawLayer);

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

        // Add draw control
        const drawControl = new L.Control.Draw(drawControlOptions);
        map.addControl(drawControl);

        // Handle draw created event
        map.on(L.Draw.Event.CREATED, function(event) {
          const layer = event.layer;
          drawLayer.addLayer(layer);
        });

        // Add marker for initial coordinates
        if (coords && isValidLatLng(coords)) {
          L.marker(coords).addTo(map);
        }

        // Add polygon if valid
        if (polygonCoordinates) {
          try {
            // For single polygon
            if (isValidPolygon(polygonCoordinates)) {
              L.polygon(polygonCoordinates).addTo(map);
            }
            // For multiple polygons or GeoJSON structure
            else if (Array.isArray(polygonCoordinates) && polygonCoordinates.every(poly => isValidPolygon(poly))) {
              polygonCoordinates.forEach(poly => {
                if (isValidPolygon(poly)) {
                  L.polygon(poly).addTo(map);
                }
              });
            }
          } catch (err) {
            console.error("Error adding polygon:", err);
          }
        }

        // Layer control
        const baseLayers = {
          'OpenStreetMap': openStreetMap,
          'Google Streets': googleStreets,
          'Google Hybrid': googleHybrid,
          'Google Satellite': googleSat,
          'Google Terrain': googleTerrain
        };

        const overlays = {
          "Draw Layer": drawLayer
        };

        L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);

        // Force a map redraw to ensure proper rendering
        setTimeout(() => {
          map.invalidateSize();
        }, 100);

      } catch (err) {
        console.error("Error initializing map:", err);
      }
    }, 100);  // Short delay to ensure DOM is ready

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (err) {
          console.error("Error cleaning up map:", err);
        }
        mapInstanceRef.current = null;
        setMapInitialized(false);
      }
    };
  }, [initialCoordinates, polygonCoordinates]);

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="leaflet-container-wrapper" style={{ width: '100%', height: '420px', position: 'relative' }}>
      <div ref={mapRef} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
      {!mapInitialized && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          bottom: 0, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: '#f0f0f0' 
        }}>
          Loading map...
        </div>
      )}
    </div>
  );
};

export default LeafletMap;