import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const defaultRegion = {
  latitude: -33.4489,
  longitude: -70.6693,
  latitudeDelta: 0.09,
  longitudeDelta: 0.06,
};

export default function TransitMap({
  busStops,
  routeStops = busStops,
  selectedRoute,
  selectedStop,
  onStopPress,
}) {
  const mapRef = useRef(null);
  const routePoints = useMemo(
    () =>
      routeStops.map((stop) => ({
        latitude: stop.latitude,
        longitude: stop.longitude,
      })),
    [routeStops],
  );

  const fitRoute = useCallback(() => {
    if (selectedStop) {
      mapRef.current?.animateToRegion(
        {
          latitude: selectedStop.latitude,
          longitude: selectedStop.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.02,
        },
        350,
      );
      return;
    }

    if (routePoints.length > 1) {
      mapRef.current?.fitToCoordinates(routePoints, {
        edgePadding: { top: 60, right: 50, bottom: 40, left: 50 },
        animated: true,
      });
    } else if (routePoints.length === 1) {
      mapRef.current?.animateToRegion(
        { ...routePoints[0], latitudeDelta: 0.025, longitudeDelta: 0.02 },
        350,
      );
    }
  }, [routePoints, selectedStop]);

  useEffect(() => {
    const frame = requestAnimationFrame(fitRoute);
    return () => cancelAnimationFrame(frame);
  }, [fitRoute]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={defaultRegion}
        mapType="none"
        showsCompass
        showsScale
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
          doubleTileSize={false}
          flipY={false}
        />
        {routePoints.length > 1 && (
          <Polyline
            coordinates={routePoints}
            strokeColor="#26734d"
            strokeWidth={5}
          />
        )}
        {busStops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={stop.name}
            description={`Recorridos: ${stop.routes.join(', ')}`}
            onPress={() => onStopPress(stop)}
          >
            <View style={styles.marker}>
              <Ionicons name="bus" size={16} color="#fff" />
            </View>
          </Marker>
        ))}
      </MapView>
      {selectedRoute && (
        <View pointerEvents="none" style={styles.routeBadge}>
          <Text style={styles.routeBadgeText}>{selectedRoute.name}</Text>
        </View>
      )}
      <Text pointerEvents="none" style={styles.attribution}>
        © OpenStreetMap contributors
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 18,
    backgroundColor: '#26734d',
    elevation: 4,
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
  attribution: {
    position: 'absolute',
    right: 4,
    bottom: 3,
    paddingHorizontal: 4,
    backgroundColor: '#ffffffcc',
    color: '#414942',
    fontSize: 9,
  },
});
