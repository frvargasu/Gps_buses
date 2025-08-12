import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { busRoutes } from '../data/mockData';

export default function RoutesScreen({ navigation, route }) {
  const { division, serviceType } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = busRoutes.filter(route =>
    route.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RouteCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.routeCard}
      onPress={() => {
        // Navegar al mapa completo con la ruta seleccionada
        navigation.navigate('FullMap', { selectedRoute: item });
      }}
    >
      <View style={styles.routeHeader}>
        <View style={styles.busIconContainer}>
          <Ionicons name="bus" size={32} color="#fff" />
        </View>
        <View style={styles.routeInfo}>
          <Text style={styles.routeTime}>{item.departureTime.slice(0, 5)} {item.destination}</Text>
          <Text style={styles.scheduleText}>Hora salida: {item.departureTime}</Text>
          <Text style={styles.scheduleText}>Hora llegada: {item.arrivalTime}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>ESTADO: </Text>
            <Text style={[styles.statusValue, { color: '#4CAF50' }]}>{item.status}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => {
            navigation.navigate('FullMap', { selectedRoute: item });
          }}
        >
          <Ionicons name="location" size={24} color="#2E4BC6" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.routeDetails}>
        <Text style={styles.originText}>Inicio: {item.origin}</Text>
        <Text style={styles.busText}>Bus {item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E4BC6" />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar ruta..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Routes List */}
      <FlatList
        data={filteredRoutes}
        renderItem={RouteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  routeHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  busIconContainer: {
    backgroundColor: '#2E4BC6',
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
  },
  routeInfo: {
    flex: 1,
  },
  routeTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  scheduleText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationButton: {
    padding: 8,
  },
  routeDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  originText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  busText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4BC6',
  },
  filterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2E4BC6',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
