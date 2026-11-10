import React, { useMemo, useState } from 'react';
import { Linking, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { busStops } from '../data/mockData';
import TransitMap from '../components/TransitMap';

export default function FullMapScreen({ route, navigation }) {
  const selectedRoute = route?.params?.selectedRoute ?? null;
  const [selectedStop, setSelectedStop] = useState(null);
  const routeStops = useMemo(
    () =>
      selectedRoute
        ? busStops.filter((stop) => stop.routes.includes(selectedRoute.id))
        : busStops,
    [selectedRoute],
  );

  const openDirections = async () => {
    if (!selectedStop) return;
    const destination = `${selectedStop.latitude},${selectedStop.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('No se pudo abrir el mapa', 'Intenta abrir las indicaciones desde tu navegador.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E4BC6" />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Volver"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{selectedRoute ? selectedRoute.name : 'Mapa de paradas'}</Text>
          <Text style={styles.headerSubtitle}>
            {selectedRoute ? selectedRoute.destination : 'Santiago, Chile'} · OpenStreetMap
          </Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <TransitMap
          busStops={routeStops}
          selectedRoute={selectedRoute}
          selectedStop={selectedStop}
          onStopPress={setSelectedStop}
        />
      </View>

      {selectedStop ? (
        <View style={styles.selectedStopPanel}>
          <View style={styles.selectedStopText}>
            <Text style={styles.stopName}>{selectedStop.name}</Text>
            <Text style={styles.stopRoutes}>Recorridos: {selectedStop.routes.join(', ')}</Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Indicaciones a ${selectedStop.name}`}
            style={styles.directionsButton}
            onPress={openDirections}
          >
            <Ionicons name="navigate" size={18} color="#fff" />
            <Text style={styles.directionsText}>Cómo llegar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.helpText}>Toca una parada para verla y obtener indicaciones.</Text>
      )}
      <Text style={styles.attribution}>
        © OpenStreetMap contributors · Recorrido aproximado entre paradas de ejemplo.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#2E4BC6',
  },
  backButton: {
    padding: 10,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  headerSubtitle: {
    marginTop: 2,
    color: '#e1e6ff',
    fontSize: 11,
  },
  mapContainer: {
    flex: 1,
    minHeight: 260,
  },
  selectedStopPanel: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    margin: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  selectedStopText: {
    flex: 1,
  },
  stopName: {
    color: '#25302a',
    fontSize: 14,
    fontWeight: '700',
  },
  stopRoutes: {
    marginTop: 4,
    color: '#666',
    fontSize: 11,
  },
  directionsButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: '#26734d',
  },
  directionsText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  helpText: {
    padding: 14,
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  attribution: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    color: '#737b77',
    fontSize: 9,
    textAlign: 'center',
  },
});
