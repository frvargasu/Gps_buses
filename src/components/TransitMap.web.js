import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import L from 'leaflet';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './TransitMap.web.css';

const defaultCenter = [-33.4489, -70.6693];

function MapCamera({ points, selectedStop }) {
  const map = useMap();

  useEffect(() => {
    if (selectedStop) {
      map.flyTo([selectedStop.latitude, selectedStop.longitude], 15, { duration: 0.5 });
      return;
    }

    if (points.length > 1) {
      map.fitBounds(points, { padding: [36, 36], maxZoom: 14 });
    } else if (points.length === 1) {
      map.setView(points[0], 14);
    }
  }, [map, points, selectedStop]);

  return null;
}

function stopIcon() {
  return L.divIcon({
    className: 'gpsbus-stop-icon',
    html: '<span>BUS</span>',
    iconSize: [38, 30],
    iconAnchor: [19, 30],
  });
}

export default function TransitMap({
  busStops,
  routeStops = busStops,
  selectedRoute,
  selectedStop,
  onStopPress,
}) {
  const points = routeStops.map((stop) => [stop.latitude, stop.longitude]);

  return (
    <View style={styles.container}>
      <MapContainer center={defaultCenter} zoom={12} scrollWheelZoom style={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapCamera points={points} selectedStop={selectedStop} />
        {points.length > 1 && (
          <Polyline positions={points} pathOptions={{ color: '#26734d', weight: 5, opacity: 0.8 }} />
        )}
        {busStops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.latitude, stop.longitude]}
            icon={stopIcon()}
            eventHandlers={{ click: () => onStopPress(stop) }}
          >
            <Popup>
              <strong>{stop.name}</strong>
              <br />
              Recorridos: {stop.routes.join(', ')}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedRoute && (
        <View pointerEvents="none" style={styles.routeBadge}>
          <Text style={styles.routeBadgeText}>{selectedRoute.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  routeBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#26734d',
  },
  routeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
