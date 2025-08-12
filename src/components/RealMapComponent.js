import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { busStops } from '../data/mockData';

export default function RealMapComponent({ selectedRoute, onStopPress }) {
  const [userLocation, setUserLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [region, setRegion] = useState({
    latitude: -33.4489, // Santiago, Chile
    longitude: -70.6693,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Solicitar permisos de ubicación al cargar
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permisos de ubicación',
          'Para una mejor experiencia, permite el acceso a tu ubicación',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Configurar', onPress: () => Location.requestForegroundPermissionsAsync() }
          ]
        );
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      setUserLocation(newLocation);
      
      // Centrar mapa en la ubicación del usuario
      const newRegion = {
        ...newLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      
      if (mapRef) {
        mapRef.animateToRegion(newRegion, 1000);
      }
    } catch (error) {
      console.log('Error getting current location:', error);
      Alert.alert('Error', 'No se pudo obtener tu ubicación actual');
    }
  };

  const centerOnUser = () => {
    if (userLocation && mapRef) {
      const newRegion = {
        ...userLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.animateToRegion(newRegion, 1000);
    } else {
      getCurrentLocation();
    }
  };

  const centerOnRoute = () => {
    if (selectedRoute && mapRef) {
      // Obtener paradas de la ruta seleccionada
      const routeStops = busStops.filter(stop => 
        stop.routes.includes(selectedRoute.id)
      );

      if (routeStops.length > 0) {
        // Calcular región que contenga todas las paradas
        const latitudes = routeStops.map(stop => stop.latitude);
        const longitudes = routeStops.map(stop => stop.longitude);
        
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);
        
        const region = {
          latitude: (minLat + maxLat) / 2,
          longitude: (minLng + maxLng) / 2,
          latitudeDelta: (maxLat - minLat) * 1.2,
          longitudeDelta: (maxLng - minLng) * 1.2,
        };
        
        mapRef.animateToRegion(region, 1000);
      }
    }
  };

  const handleStopPress = (stop) => {
    Alert.alert(
      `🚏 ${stop.name}`,
      `📍 ${stop.latitude.toFixed(4)}, ${stop.longitude.toFixed(4)}\n🚌 Rutas: ${stop.routes.join(', ')}\n\n¿Qué deseas hacer?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: '🧭 Navegar', 
          onPress: () => {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${stop.latitude},${stop.longitude}`;
            Alert.alert('🧭 Navegación', `Abriendo navegación a ${stop.name}`);
          }
        },
        { 
          text: '⏰ Horarios', 
          onPress: () => Alert.alert('⏰ Próximo Bus', 'Estimado: 5-8 minutos') 
        }
      ]
    );
  };

  // Filtrar paradas según la ruta seleccionada
  const relevantStops = selectedRoute 
    ? busStops.filter(stop => stop.routes.includes(selectedRoute.id))
    : busStops;

  // Generar coordenadas para la ruta si hay una seleccionada
  const routeCoordinates = selectedRoute && relevantStops.length > 1
    ? relevantStops.map(stop => ({
        latitude: stop.latitude,
        longitude: stop.longitude,
      }))
    : [];

  return (
    <View style={styles.container}>
      <MapView
        ref={setMapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
        // Configuración para OpenStreetMap (alternativa gratuita)
        customMapStyle={[]} // Estilo por defecto
      >
        {/* Marcadores de paradas de bus */}
        {relevantStops.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={stop.name}
            description={`Rutas: ${stop.routes.join(', ')}`}
            onPress={() => handleStopPress(stop)}
          >
            <View style={[
              styles.customMarker,
              selectedRoute && stop.routes.includes(selectedRoute.id) 
                ? styles.highlightedMarker 
                : styles.normalMarker
            ]}>
              <Ionicons 
                name="bus" 
                size={20} 
                color={selectedRoute && stop.routes.includes(selectedRoute.id) ? "#fff" : "#2E4BC6"} 
              />
            </View>
          </Marker>
        ))}

        {/* Línea de ruta si hay una ruta seleccionada */}
        {routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#ff6b35"
            strokeWidth={4}
            lineDashPattern={[5, 5]}
          />
        )}

        {/* Marcador de ubicación del usuario personalizado */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Tu ubicación"
            description="Estás aquí"
          >
            <View style={styles.userMarker}>
              <Ionicons name="radio-button-on" size={24} color="#ff4444" />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Controles flotantes */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={centerOnUser}
        >
          <Ionicons name="locate" size={24} color="#2E4BC6" />
        </TouchableOpacity>

        {selectedRoute && (
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={centerOnRoute}
          >
            <Ionicons name="bus" size={24} color="#2E4BC6" />
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={() => {
            const newRegion = {
              latitude: -33.4489,
              longitude: -70.6693,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            };
            setRegion(newRegion);
            if (mapRef) {
              mapRef.animateToRegion(newRegion, 1000);
            }
          }}
        >
          <Ionicons name="refresh" size={24} color="#2E4BC6" />
        </TouchableOpacity>
      </View>

      {/* Información de la ruta */}
      {selectedRoute && (
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>
            🚌 {selectedRoute.name} - {selectedRoute.destination}
          </Text>
          <Text style={styles.stopCount}>
            📍 {relevantStops.length} parada{relevantStops.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  customMarker: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  normalMarker: {
    backgroundColor: '#fff',
  },
  highlightedMarker: {
    backgroundColor: '#ff6b35',
  },
  userMarker: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ff4444',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  controls: {
    position: 'absolute',
    right: 15,
    top: 60,
    flexDirection: 'column',
    gap: 10,
  },
  controlButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  routeInfo: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4BC6',
  },
  stopCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
