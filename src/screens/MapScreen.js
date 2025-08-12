import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { busStops } from '../data/mockData';
import MobileMapComponent from '../components/MobileMapComponent';
import WebMapComponent from '../components/WebMapComponent';

export default function MapScreen({ route }) {
  const [selectedRoute, setSelectedRoute] = useState(route?.params?.selectedRoute);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: -33.4489,
    longitude: -70.6693,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Detectar cuando se reciben nuevos parámetros de navegación
  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.selectedRoute) {
        setSelectedRoute(route.params.selectedRoute);
      }
    }, [route?.params?.selectedRoute])
  );

  useEffect(() => {
    if (Platform.OS !== 'web') {
      getLocationPermission();
    }
  }, []);

  const getLocationPermission = async () => {
    if (Platform.OS === 'web') return;
    
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permisos requeridos',
          'Se necesitan permisos de ubicación para mostrar tu posición en el mapa.'
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const centerOnUser = () => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const clearSelectedRoute = () => {
    setSelectedRoute(null);
  };

  // Web version with simple map representation
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Header */}
        <View style={styles.webHeader}>
          <Ionicons name="map" size={32} color="#2E4BC6" />
          <Text style={styles.webHeaderTitle}>Mapa de Paradas</Text>
        </View>

        {/* Map Area with Santiago representation */}
        <View style={styles.webMapArea}>
          <View style={styles.cityMap}>
            <Text style={styles.cityName}>Santiago, Chile</Text>
            
            {/* Simulate map zones */}
            <View style={styles.mapZones}>
              <View style={styles.zone}>
                <Text style={styles.zoneName}>Centro</Text>
                <View style={styles.stopsInZone}>
                  {busStops.filter(stop => stop.name.includes('Santiago') || stop.name.includes('Central')).map(stop => (
                    <TouchableOpacity key={stop.id} style={styles.webStopMarker}>
                      <Ionicons name="bus" size={16} color="#fff" />
                      <Text style={styles.stopLabel}>{stop.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.zone}>
                <Text style={styles.zoneName}>Sur</Text>
                <View style={styles.stopsInZone}>
                  {busStops.filter(stop => stop.name.includes('San Bernardo')).map(stop => (
                    <TouchableOpacity key={stop.id} style={styles.webStopMarker}>
                      <Ionicons name="bus" size={16} color="#fff" />
                      <Text style={styles.stopLabel}>{stop.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.zone}>
                <Text style={styles.zoneName}>Oeste</Text>
                <View style={styles.stopsInZone}>
                  {busStops.filter(stop => stop.name.includes('Pudahuel')).map(stop => (
                    <TouchableOpacity key={stop.id} style={styles.webStopMarker}>
                      <Ionicons name="bus" size={16} color="#fff" />
                      <Text style={styles.stopLabel}>{stop.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bus Stops List */}
        <ScrollView style={styles.stopsListWeb}>
          <Text style={styles.stopsTitle}>Todas las Paradas:</Text>
          {busStops.map((stop) => (
            <TouchableOpacity key={stop.id} style={styles.stopItemWeb}>
              <View style={styles.busStopMarker}>
                <Ionicons name="bus" size={16} color="#fff" />
              </View>
              <View style={styles.stopInfoWeb}>
                <Text style={styles.stopNameWeb}>{stop.name}</Text>
                <Text style={styles.stopRoutesWeb}>
                  Rutas: {stop.routes.join(', ')}
                </Text>
                <Text style={styles.coordinatesWeb}>
                  {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Web Note */}
        <View style={styles.webNote}>
          <Text style={styles.webNoteText}>
            💡 Para ver el mapa interactivo completo, descarga la app móvil
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <MobileMapComponent 
        busStops={busStops} 
        selectedRoute={selectedRoute}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    flex: 1,
  },
  // Web-specific styles
  webHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    gap: 12,
  },
  webHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  webMapArea: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cityMap: {
    alignItems: 'center',
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4BC6',
    marginBottom: 16,
  },
  mapZones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
    gap: 12,
  },
  zone: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  zoneName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4BC6',
    marginBottom: 8,
  },
  stopsInZone: {
    alignItems: 'center',
    gap: 4,
  },
  webStopMarker: {
    backgroundColor: '#2E4BC6',
    borderRadius: 15,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 2,
  },
  stopLabel: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  stopsListWeb: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stopsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  stopItemWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  stopInfoWeb: {
    flex: 1,
    marginLeft: 12,
  },
  stopNameWeb: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  stopRoutesWeb: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  coordinatesWeb: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  webNote: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2E4BC6',
  },
  webNoteText: {
    fontSize: 14,
    color: '#1976d2',
    fontStyle: 'italic',
  },
  // Mobile styles (existing)
  controls: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -75 }],
  },
  controlButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#333',
  },
  busStopMarker: {
    backgroundColor: '#2E4BC6',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
