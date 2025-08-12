import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WebMapComponent = ({ busStops, selectedRoute }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={60} color="#ccc" />
        <Text style={styles.placeholderText}>Mapa Web</Text>
        <Text style={styles.subText}>Versión simplificada para navegador</Text>
      </View>
      
      <ScrollView style={styles.stopsContainer}>
        <Text style={styles.stopsTitle}>Paradas de Autobús</Text>
        {busStops.map((stop) => (
          <TouchableOpacity key={stop.id} style={styles.stopItem}>
            <View style={styles.stopIcon}>
              <Ionicons name="location" size={20} color="#2196F3" />
            </View>
            <View style={styles.stopInfo}>
              <Text style={styles.stopName}>{stop.name}</Text>
              <Text style={styles.stopCoords}>
                Lat: {stop.latitude.toFixed(4)}, Lng: {stop.longitude.toFixed(4)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#e8f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  subText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  stopsContainer: {
    flex: 1,
    padding: 16,
  },
  stopsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  stopItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  stopIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  stopCoords: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default WebMapComponent;
