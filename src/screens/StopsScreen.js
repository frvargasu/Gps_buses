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
import { busStops } from '../data/mockData';

export default function StopsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStops = busStops.filter(stop =>
    stop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const StopCard = ({ item }) => (
    <TouchableOpacity style={styles.stopCard}>
      <View style={styles.stopHeader}>
        <View style={styles.stopIconContainer}>
          <Ionicons name="location" size={24} color="#fff" />
        </View>
        <View style={styles.stopInfo}>
          <Text style={styles.stopName}>{item.name}</Text>
          <Text style={styles.coordinatesText}>
            Lat: {item.latitude.toFixed(4)}, Lng: {item.longitude.toFixed(4)}
          </Text>
          <View style={styles.routesContainer}>
            <Text style={styles.routesLabel}>Rutas: </Text>
            {item.routes.map((route, index) => (
              <View key={route} style={styles.routeTag}>
                <Text style={styles.routeTagText}>{route}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.directionButton}>
          <Ionicons name="navigate" size={24} color="#2E4BC6" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E4BC6" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2E4BC6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paradas de Bus</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#2E4BC6" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar parada..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Stops List */}
      <FlatList
        data={filteredStops}
        renderItem={StopCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="map" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    padding: 8,
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
  stopCard: {
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
  },
  stopHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  stopIconContainer: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  routesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  routesLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  routeTag: {
    backgroundColor: '#2E4BC6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  routeTagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  directionButton: {
    padding: 8,
  },
  fab: {
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
