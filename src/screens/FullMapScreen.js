import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MobileMapComponent from '../components/MobileMapComponent';

export default function FullMapScreen({ route, navigation }) {
  const selectedRoute = route?.params?.selectedRoute;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E4BC6" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedRoute ? `Mapa - ${selectedRoute.name}` : 'Mapa GPS'}
        </Text>
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => Alert.alert(
            '🗺️ Mapa GPS',
            'Mapa en tiempo real con tu ubicación actual\n\n📍 Toca las paradas para más información\n🧭 Usa los controles para navegar\n📱 Permite el GPS para mejor precisión'
          )}
        >
          <Ionicons name="information-circle" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Información de ruta seleccionada */}
      {selectedRoute && (
        <View style={styles.routeInfo}>
          <View style={styles.routeBadge}>
            <Ionicons name="bus" size={20} color="#fff" />
            <Text style={styles.routeText}>
              {selectedRoute.name} - {selectedRoute.destination}
            </Text>
          </View>
          <Text style={styles.routeDetails}>
            🕐 {selectedRoute.departureTime} → {selectedRoute.arrivalTime} | 
            📍 Desde: {selectedRoute.origin}
          </Text>
        </View>
      )}

      {/* Mapa simulado en pantalla completa */}
      <View style={styles.mapContainer}>
        <MobileMapComponent 
          selectedRoute={selectedRoute}
          busStops={require('../data/mockData').busStops}
        />
      </View>

      {/* Botón de ayuda flotante */}
      <TouchableOpacity 
        style={styles.helpButton}
        onPress={() => Alert.alert(
          '💡 Ayuda',
          '🔹 Pellizca para hacer zoom\n🔹 Arrastra para mover el mapa\n🔹 Toca las paradas para información\n🔹 Usa el botón 📍 para centrarte\n🔹 El botón 🚌 centra en la ruta'
        )}
      >
        <Ionicons name="help-circle" size={28} color="#fff" />
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
    backgroundColor: '#2E4BC6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  infoButton: {
    padding: 8,
  },
  routeInfo: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4BC6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  routeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
  routeDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2E4BC6',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
