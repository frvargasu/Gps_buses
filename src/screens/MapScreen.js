import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { busStops } from '../data/mockData';
import TransitMap from '../components/TransitMap';

const normalizeSearchText = (value) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function MapScreen({ route }) {
  const [selectedRoute, setSelectedRoute] = useState(route?.params?.selectedRoute ?? null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.selectedRoute) {
        setSelectedRoute(route.params.selectedRoute);
        setSelectedStop(null);
      }
    }, [route?.params?.selectedRoute]),
  );

  const visibleStops = useMemo(() => {
    const query = normalizeSearchText(searchQuery.trim());
    const routeStops = busStops.filter(
      (stop) => !selectedRoute || stop.routes.includes(selectedRoute.id),
    );
    return routeStops.filter((stop) => {
      const matchesQuery =
        !query ||
        normalizeSearchText(stop.name).includes(query) ||
        stop.routes.some((routeId) => normalizeSearchText(routeId).includes(query));
      return matchesQuery;
    });
  }, [searchQuery, selectedRoute]);
  const routeStops = useMemo(
    () => busStops.filter((stop) => !selectedRoute || stop.routes.includes(selectedRoute.id)),
    [selectedRoute],
  );

  const handleOpenDirections = async (stop) => {
    const destination = `${stop.latitude},${stop.longitude}`;
    const url = Platform.select({
      ios: `https://maps.apple.com/?daddr=${destination}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    });

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('No se pudo abrir el mapa', 'Intenta abrir las indicaciones desde tu navegador.');
    }
  };

  const clearSelectedRoute = () => {
    setSelectedRoute(null);
    setSelectedStop(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f8fa" />

      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>GPS BUS · SANTIAGO</Text>
          <Text style={styles.title}>Mapa de paradas</Text>
        </View>
        <View style={styles.openStreetMapBadge}>
          <Ionicons name="leaf-outline" size={16} color="#26734d" />
          <Text style={styles.openStreetMapText}>OpenStreetMap</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6b7280" />
        <TextInput
          accessibilityLabel="Buscar paradas o recorridos"
          style={styles.searchInput}
          placeholder="Buscar parada o recorrido"
          placeholderTextColor="#8b9099"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {!!searchQuery && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Limpiar búsqueda"
            onPress={() => setSearchQuery('')}
          >
            <Ionicons name="close-circle" size={20} color="#8b9099" />
          </TouchableOpacity>
        )}
      </View>

      {selectedRoute && (
        <View style={styles.routeBanner}>
          <Ionicons name="bus" size={18} color="#fff" />
          <Text style={styles.routeBannerText} numberOfLines={1}>
            {selectedRoute.name} · {selectedRoute.destination}
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Quitar filtro de recorrido"
            onPress={clearSelectedRoute}
            style={styles.clearRouteButton}
          >
            <Ionicons name="close" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.mapContainer}>
        <TransitMap
          busStops={visibleStops}
          routeStops={routeStops}
          selectedRoute={selectedRoute}
          selectedStop={selectedStop}
          onStopPress={setSelectedStop}
        />
      </View>

      <View style={styles.listHeader}>
        <View>
          <Text style={styles.listTitle}>
            {selectedRoute ? 'Paradas del recorrido' : 'Paradas disponibles'}
          </Text>
          <Text style={styles.listSubtitle}>
            {visibleStops.length} {visibleStops.length === 1 ? 'parada' : 'paradas'}
          </Text>
        </View>
        <Text style={styles.approximateNote}>Ubicaciones de ejemplo</Text>
      </View>

      <ScrollView
        style={styles.stopsList}
        contentContainerStyle={styles.stopsListContent}
        keyboardShouldPersistTaps="handled"
      >
        {visibleStops.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={24} color="#8b9099" />
            <Text style={styles.emptyStateText}>No encontramos paradas con esa búsqueda.</Text>
          </View>
        ) : (
          visibleStops.map((stop) => {
            const isSelected = selectedStop?.id === stop.id;
            return (
              <View key={stop.id} style={[styles.stopCard, isSelected && styles.selectedStopCard]}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Mostrar ${stop.name} en el mapa`}
                  style={styles.stopMain}
                  onPress={() => setSelectedStop(stop)}
                >
                  <View style={styles.stopIcon}>
                    <Ionicons name="bus" size={18} color="#26734d" />
                  </View>
                  <View style={styles.stopInfo}>
                    <Text style={styles.stopName}>{stop.name}</Text>
                    <Text style={styles.stopRoutes}>Recorridos: {stop.routes.join(', ')}</Text>
                    <Text style={styles.stopCoordinates}>
                      {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel={`Indicaciones a ${stop.name}`}
                  style={styles.directionsButton}
                  onPress={() => handleOpenDirections(stop)}
                >
                  <Ionicons name="navigate-outline" size={19} color="#26734d" />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>

      <Text style={styles.attribution}>
        © OpenStreetMap contributors · El trazado conecta las paradas de ejemplo.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  header: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  eyebrow: {
    color: '#26734d',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    marginTop: 3,
    color: '#17231d',
    fontSize: 21,
    fontWeight: '700',
  },
  openStreetMapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#e5f1e9',
  },
  openStreetMapText: {
    color: '#26734d',
    fontSize: 10,
    fontWeight: '700',
  },
  searchContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e4e8',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#17231d',
    fontSize: 14,
    outlineStyle: 'none',
  },
  routeBanner: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 9,
    paddingLeft: 12,
    borderRadius: 9,
    backgroundColor: '#26734d',
  },
  routeBannerText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  clearRouteButton: {
    padding: 9,
  },
  mapContainer: {
    flex: 1,
    minHeight: 250,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dce2dc',
    borderRadius: 14,
    backgroundColor: '#e8eee8',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 8,
  },
  listTitle: {
    color: '#17231d',
    fontSize: 15,
    fontWeight: '700',
  },
  listSubtitle: {
    marginTop: 2,
    color: '#737b77',
    fontSize: 11,
  },
  approximateNote: {
    color: '#737b77',
    fontSize: 10,
  },
  stopsList: {
    flex: 0.8,
    minHeight: 120,
  },
  stopsListContent: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  stopCard: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e8e5',
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  selectedStopCard: {
    borderColor: '#26734d',
    backgroundColor: '#f3f8f4',
  },
  stopMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  stopIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#e5f1e9',
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    color: '#17231d',
    fontSize: 13,
    fontWeight: '700',
  },
  stopRoutes: {
    marginTop: 2,
    color: '#59645d',
    fontSize: 11,
  },
  stopCoordinates: {
    marginTop: 2,
    color: '#8b9099',
    fontSize: 10,
  },
  directionsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#e5f1e9',
  },
  emptyState: {
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    paddingHorizontal: 18,
  },
  emptyStateText: {
    color: '#737b77',
    fontSize: 12,
  },
  attribution: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 7,
    color: '#737b77',
    fontSize: 9,
    textAlign: 'center',
  },
});
