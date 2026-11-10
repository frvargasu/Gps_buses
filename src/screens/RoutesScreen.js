import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { busRoutes } from '../data/mockData';
import { COLORS } from '../constants';

const normalize = (value) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function RoutesScreen({ navigation, route }) {
  const { division, serviceType } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = useMemo(() => {
    const query = normalize(searchQuery.trim());
    return busRoutes.filter((busRoute) => {
      const matchesDivision =
        !division || normalize(busRoute.division) === normalize(division.name);
      const matchesDirection = !serviceType || busRoute.direction === serviceType.id;
      const matchesQuery =
        !query ||
        normalize(busRoute.destination).includes(query) ||
        normalize(busRoute.name).includes(query) ||
        busRoute.id.includes(query);
      return matchesDivision && matchesDirection && matchesQuery;
    });
  }, [division, searchQuery, serviceType]);

  const renderRoute = ({ item }) => (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Ver mapa del recorrido ${item.name}, ${item.destination}`}
      style={styles.routeCard}
      onPress={() => navigation.navigate('FullMap', { selectedRoute: item })}
    >
      <View style={styles.routeTopline}>
        <View style={styles.routeNumber}>
          <Ionicons name="bus" size={15} color={COLORS.white} />
          <Text style={styles.routeNumberText}>{item.id}</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{item.status.replace('_', ' ')}</Text>
        </View>
      </View>

      <Text style={styles.destination}>{item.destination}</Text>
      <View style={styles.originRow}>
        <Ionicons name="navigate-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.originText} numberOfLines={1}>
          Desde {item.origin}
        </Text>
      </View>

      <View style={styles.cardDivider} />
      <View style={styles.routeFooter}>
        <View style={styles.timeGroup}>
          <View>
            <Text style={styles.timeLabel}>SALIDA</Text>
            <Text style={styles.timeValue}>{item.departureTime.slice(0, 5)}</Text>
          </View>
          <Ionicons name="arrow-forward" size={15} color={COLORS.textLight} />
          <View>
            <Text style={styles.timeLabel}>LLEGADA</Text>
            <Text style={styles.timeValue}>{item.arrivalTime.slice(0, 5)}</Text>
          </View>
        </View>
        <View style={styles.mapAction}>
          <Text style={styles.mapActionText}>Ver mapa</Text>
          <Ionicons name="arrow-forward" size={15} color={COLORS.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>RECORRIDOS · {division.name.toUpperCase()}</Text>
        <Text style={styles.title}>Tu próximo viaje</Text>
        <Text style={styles.subtitle}>{serviceType.name} · Horarios de referencia</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={19} color={COLORS.primary} />
        <TextInput
          accessibilityLabel="Buscar por recorrido o destino"
          style={styles.searchInput}
          placeholder="Busca recorrido o destino"
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
        data={filteredRoutes}
        renderItem={renderRoute}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          filteredRoutes.length > 0 ? (
            <Text style={styles.resultCount}>
              {filteredRoutes.length} {filteredRoutes.length === 1 ? 'recorrido' : 'recorridos'}
            </Text>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="bus-outline" size={26} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>No hay recorridos</Text>
            <Text style={styles.emptyText}>
              Prueba con otra búsqueda o selecciona un servicio diferente.
            </Text>
          </View>
        }
      />
      <View style={styles.disclaimer}>
        <Ionicons name="information-circle-outline" size={15} color={COLORS.textSecondary} />
        <Text style={styles.disclaimerText}>Horarios y recorridos de ejemplo.</Text>
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
    paddingHorizontal: 20,
    paddingTop: 19,
    paddingBottom: 13,
  },
  eyebrow: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  title: {
    marginTop: 5,
    color: COLORS.text,
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  searchContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginHorizontal: 16,
    marginBottom: 4,
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
  routeCard: {
    marginBottom: 11,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    backgroundColor: COLORS.white,
  },
  routeTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
  },
  routeNumberText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '800',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 11,
    backgroundColor: COLORS.primaryLight,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  statusText: {
    color: COLORS.primary,
    fontSize: 8,
    fontWeight: '800',
  },
  destination: {
    marginTop: 12,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },
  originRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  originText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  cardDivider: {
    height: 1,
    marginTop: 12,
    backgroundColor: COLORS.border,
  },
  routeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeLabel: {
    color: COLORS.textLight,
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  timeValue: {
    marginTop: 3,
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '800',
  },
  mapAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  mapActionText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  emptyIcon: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
  },
  emptyTitle: {
    marginTop: 12,
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '800',
  },
  emptyText: {
    marginTop: 5,
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
  },
  disclaimerText: {
    color: COLORS.textSecondary,
    fontSize: 9,
  },
});
