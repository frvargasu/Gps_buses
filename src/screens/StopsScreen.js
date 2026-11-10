import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { busStops } from '../data/mockData';
import { COLORS } from '../constants';

const normalize = (value) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function StopsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredStops = useMemo(() => {
    const query = normalize(searchQuery.trim());
    return busStops.filter(
      (stop) =>
        !query ||
        normalize(stop.name).includes(query) ||
        stop.routes.some((routeId) => routeId.includes(query)),
    );
  }, [searchQuery]);

  const openDirections = async (stop) => {
    const destination = `${stop.latitude},${stop.longitude}`;
    const url = Platform.select({
      ios: `https://maps.apple.com/?daddr=${destination}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    });
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('No se pudo abrir el mapa', 'Intenta nuevamente desde tu navegador.');
    }
  };

  const renderStop = ({ item, index }) => (
    <View style={styles.stopCard}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Ver ${item.name} en el mapa`}
        style={styles.stopMain}
        onPress={() => navigation.navigate('Mapa')}
      >
        <View style={styles.stopLeading}>
          <Text style={styles.stopIndex}>{String(index + 1).padStart(2, '0')}</Text>
          <View style={styles.stopIcon}>
            <Ionicons name="location" size={20} color={COLORS.primary} />
          </View>
        </View>
        <View style={styles.stopInfo}>
          <Text style={styles.stopName}>{item.name}</Text>
          <Text style={styles.coordinates}>
            {item.latitude.toFixed(4)} · {item.longitude.toFixed(4)}
          </Text>
          <View style={styles.routesContainer}>
            <Text style={styles.routesLabel}>RECORRIDOS</Text>
            <View style={styles.routeTags}>
              {item.routes.map((routeId) => (
                <View key={routeId} style={styles.routeTag}>
                  <Text style={styles.routeTagText}>{routeId}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Indicaciones a ${item.name}`}
        style={styles.directionButton}
        onPress={() => openDirections(item)}
      >
        <Ionicons name="navigate" size={17} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.heading}>
        <View style={styles.headingCopy}>
          <Text style={styles.eyebrow}>SANTIAGO · PARADAS</Text>
          <Text style={styles.title}>Encuentra tu parada</Text>
          <Text style={styles.subtitle}>Explora los puntos disponibles en el mapa.</Text>
        </View>
        <View style={styles.headingIcon}>
          <Ionicons name="location" size={23} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={19} color={COLORS.primary} />
        <TextInput
          accessibilityLabel="Buscar parada o recorrido"
          style={styles.searchInput}
          placeholder="Buscar parada o recorrido"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.textLight}
          returnKeyType="search"
        />
        {!!searchQuery && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Limpiar búsqueda"
            onPress={() => setSearchQuery('')}
          >
            <Ionicons name="close-circle" size={19} color={COLORS.textLight} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredStops}
        renderItem={renderStop}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          filteredStops.length ? (
            <Text style={styles.resultCount}>
              {filteredStops.length} {filteredStops.length === 1 ? 'parada disponible' : 'paradas disponibles'}
            </Text>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={27} color={COLORS.primary} />
            <Text style={styles.emptyTitle}>No encontramos esa parada</Text>
            <Text style={styles.emptyText}>Prueba con otro nombre o número de recorrido.</Text>
          </View>
        }
      />

      <View style={styles.bottomBar}>
        <View style={styles.disclaimer}>
          <Ionicons name="information-circle-outline" size={15} color={COLORS.textSecondary} />
          <Text style={styles.disclaimerText}>Ubicaciones de ejemplo</Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.mapButton}
          onPress={() => navigation.navigate('Mapa')}
        >
          <Ionicons name="map-outline" size={17} color={COLORS.white} />
          <Text style={styles.mapButtonText}>Abrir mapa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 19,
    paddingBottom: 15,
  },
  headingCopy: {
    flex: 1,
  },
  eyebrow: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 5,
    color: COLORS.text,
    fontSize: 23,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  headingIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
  },
  searchContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginHorizontal: 16,
    marginBottom: 5,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLORS.text,
    fontSize: 13,
    outlineStyle: 'none',
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  resultCount: {
    marginBottom: 9,
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    backgroundColor: COLORS.white,
  },
  stopMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopLeading: {
    alignItems: 'center',
    gap: 6,
  },
  stopIndex: {
    color: COLORS.textLight,
    fontSize: 8,
    fontWeight: '800',
  },
  stopIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
  },
  stopInfo: {
    flex: 1,
    marginLeft: 11,
  },
  stopName: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '800',
  },
  coordinates: {
    marginTop: 3,
    color: COLORS.textLight,
    fontSize: 9,
  },
  routesContainer: {
    marginTop: 9,
  },
  routesLabel: {
    color: COLORS.textSecondary,
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  routeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
  },
  routeTag: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: COLORS.primaryLight,
  },
  routeTagText: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: '800',
  },
  directionButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 55,
  },
  emptyTitle: {
    marginTop: 10,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '800',
  },
  emptyText: {
    marginTop: 5,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  disclaimerText: {
    color: COLORS.textSecondary,
    fontSize: 9,
  },
  mapButton: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 13,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
  },
  mapButtonText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
  },
});
