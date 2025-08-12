import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text, ScrollView, Modal, Alert, PanGestureHandler, GestureHandlerRootView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler as RNGestureHandlerPanGestureHandler, GestureHandlerRootView as RNGestureHandlerRootView } from 'react-native-gesture-handler';

// Para Android/iOS, mostraremos una vista similar a la web pero adaptada para móvil
export default function MobileMapComponent({ region, busStops, selectedRoute, onRegionChange, onCenterUser, onClearRoute }) {
  const [selectedStop, setSelectedStop] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });

  const handleStopPress = (stop) => {
    setSelectedStop(stop);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStop(null);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.3, 0.5));
  };

  const handleMapPress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    // Simular click en el mapa
    Alert.alert(
      'Ubicación en el mapa', 
      `Coordenadas: ${(locationX/10).toFixed(4)}, ${(locationY/10).toFixed(4)}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ir aquí', onPress: () => console.log('Navegando...') }
      ]
    );
  };

  const resetMapView = () => {
    setZoomLevel(1);
    setMapPosition({ x: 0, y: 0 });
  };
  if (Platform.OS === 'web') {
    return null; // No renderizar nada en web
  }

  return (
    <View style={styles.container}>
      {/* Área del mapa simulada para móvil */}
      <View style={styles.mapArea}>
        <TouchableOpacity 
          style={styles.mapPlaceholder}
          onPress={handleMapPress}
          activeOpacity={0.8}
        >
          {/* Fondo del mapa simulado */}
          <View style={[styles.mapBackground, { transform: [{ scale: zoomLevel }] }]}>
            {/* Calles horizontales */}
            <View style={[styles.street, styles.horizontalStreet, { top: '20%' }]} />
            <View style={[styles.street, styles.horizontalStreet, { top: '40%' }]} />
            <View style={[styles.street, styles.horizontalStreet, { top: '60%' }]} />
            <View style={[styles.street, styles.horizontalStreet, { top: '80%' }]} />
            
            {/* Calles verticales */}
            <View style={[styles.street, styles.verticalStreet, { left: '20%' }]} />
            <View style={[styles.street, styles.verticalStreet, { left: '40%' }]} />
            <View style={[styles.street, styles.verticalStreet, { left: '60%' }]} />
            <View style={[styles.street, styles.verticalStreet, { left: '80%' }]} />
            
            {/* Marcadores de paradas en el mapa - CLICKEABLES */}
            {(selectedRoute 
              ? busStops.filter(stop => stop.routes.includes(selectedRoute.id))
              : busStops.slice(0, 4)
            ).map((stop, index) => {
              const positions = [
                { top: '30%', left: '25%' },
                { top: '50%', left: '45%' },
                { top: '35%', left: '65%' },
                { top: '70%', left: '35%' }
              ];
              const position = positions[index] || { top: '50%', left: '50%' };
              
              return (
                <TouchableOpacity
                  key={stop.id}
                  style={[styles.mapStopMarker, position]}
                  onPress={() => handleStopPress(stop)}
                >
                  <Ionicons name="bus" size={12} color="#fff" />
                </TouchableOpacity>
              );
            })}
            
            {/* Ruta del bus si hay una seleccionada */}
            {selectedRoute && (
              <>
                <View style={[styles.busRoute, { top: '30%', left: '25%', width: '20%' }]} />
                <View style={[styles.busRoute, { top: '30%', left: '45%', height: '20%', width: 3 }]} />
                <View style={[styles.busRoute, { top: '50%', left: '45%', width: '20%' }]} />
                <View style={[styles.busRoute, { top: '35%', left: '65%', height: '35%', width: 3 }]} />
              </>
            )}
            
            {/* Ubicación del usuario - CLICKEABLE */}
            {region && (
              <TouchableOpacity 
                style={[styles.userLocation, { top: '45%', left: '50%' }]}
                onPress={() => Alert.alert('Tu ubicación', 'Estás aquí 📍')}
              >
                <Ionicons name="radio-button-on" size={16} color="#ff4444" />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Overlay con información */}
          <View style={styles.mapOverlay}>
            <Text style={styles.mapTitle}>Mapa de Santiago</Text>
            <Text style={styles.mapSubtitle}>Chile - Zoom: {zoomLevel.toFixed(1)}x</Text>
            
            {/* Mostrar ruta seleccionada si existe */}
            {selectedRoute && (
              <View style={styles.selectedRouteInfo}>
                <Ionicons name="bus" size={20} color="#2E4BC6" />
                <Text style={styles.selectedRouteText}>
                  Ruta: {selectedRoute.name} - {selectedRoute.destination}
                </Text>
                <TouchableOpacity onPress={onClearRoute} style={styles.clearRouteButton}>
                  <Ionicons name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
            
            {/* Mostrar ubicación actual si está disponible */}
            {region && (
              <Text style={styles.locationText}>
                📍 {region.latitude.toFixed(4)}, {region.longitude.toFixed(4)}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Lista de paradas */}
      <ScrollView style={styles.stopsContainer}>
        <Text style={styles.stopsTitle}>
          {selectedRoute 
            ? `Paradas de la Ruta ${selectedRoute.name}` 
            : 'Paradas Cercanas'
          }
        </Text>
        {(selectedRoute 
          ? busStops.filter(stop => stop.routes.includes(selectedRoute.id))
          : busStops.slice(0, 5)
        ).map((stop) => (
          <TouchableOpacity 
            key={stop.id} 
            style={styles.stopItem}
            onPress={() => handleStopPress(stop)}
          >
            <View style={styles.busStopMarker}>
              <Ionicons name="bus" size={16} color="#fff" />
            </View>
            <View style={styles.stopInfo}>
              <Text style={styles.stopName}>{stop.name}</Text>
              <Text style={styles.stopRoutes}>
                Rutas: {stop.routes.join(', ')}
              </Text>
              <Text style={styles.stopDistance}>
                📍 {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Controles del mapa - FUNCIONALES */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={onCenterUser}>
          <Ionicons name="locate" size={24} color="#2E4BC6" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomIn}>
          <Ionicons name="add" size={24} color="#2E4BC6" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleZoomOut}>
          <Ionicons name="remove" size={24} color="#2E4BC6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={resetMapView}>
          <Ionicons name="refresh" size={24} color="#2E4BC6" />
        </TouchableOpacity>
      </View>

      {/* Leyenda */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={styles.busStopMarker}>
            <Ionicons name="bus" size={16} color="#fff" />
          </View>
          <Text style={styles.legendText}>Paradas de Bus</Text>
        </View>
      </View>

      {/* Modal para detalles de parada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalles de Parada</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {selectedStop && (
              <View style={styles.modalBody}>
                <View style={styles.stopDetailHeader}>
                  <View style={styles.busStopMarker}>
                    <Ionicons name="bus" size={20} color="#fff" />
                  </View>
                  <Text style={styles.modalStopName}>{selectedStop.name}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    Coordenadas: {selectedStop.latitude.toFixed(4)}, {selectedStop.longitude.toFixed(4)}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Ionicons name="bus" size={16} color="#666" />
                  <Text style={styles.detailText}>
                    Rutas disponibles: {selectedStop.routes.join(', ')}
                  </Text>
                </View>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                      Alert.alert('🧭 Navegación GPS', `Iniciando navegación a ${selectedStop.name}...`);
                      closeModal();
                    }}
                  >
                    <Ionicons name="navigate" size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Ir a parada</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.secondaryButton]}
                    onPress={() => {
                      Alert.alert('⏰ Horarios', `Próximo bus en ${selectedStop.name}:\n🚌 5 minutos\n🚌 12 minutos\n🚌 18 minutos`);
                    }}
                  >
                    <Ionicons name="time" size={20} color="#2E4BC6" />
                    <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Ver horarios</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.actionButton, styles.tertiaryButton]}
                    onPress={() => {
                      Alert.alert('🚌 Rutas', `Rutas que pasan por ${selectedStop.name}:\n${selectedStop.routes.map(r => `• Ruta ${r}`).join('\n')}`);
                    }}
                  >
                    <Ionicons name="bus" size={20} color="#ff6b35" />
                    <Text style={[styles.actionButtonText, styles.tertiaryButtonText]}>Ver rutas</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapArea: {
    height: 250,
    backgroundColor: '#e8f4f8',
  },
  mapPlaceholder: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#e8f4f8',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#f0f8f0',
    position: 'relative',
  },
  street: {
    backgroundColor: '#ddd',
    position: 'absolute',
  },
  horizontalStreet: {
    height: 3,
    width: '100%',
  },
  verticalStreet: {
    width: 3,
    height: '100%',
  },
  mapStopMarker: {
    position: 'absolute',
    backgroundColor: '#2E4BC6',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  busRoute: {
    position: 'absolute',
    backgroundColor: '#ff6b35',
    height: 3,
  },
  userLocation: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  mapOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4BC6',
    textAlign: 'center',
  },
  mapSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'center',
  },
  selectedRouteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4BC6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 5,
    alignSelf: 'center',
  },
  selectedRouteText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
    flex: 1,
  },
  clearRouteButton: {
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  stopsContainer: {
    flex: 1,
    padding: 16,
  },
  stopsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
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
    alignItems: 'center',
  },
  stopInfo: {
    flex: 1,
    marginLeft: 12,
  },
  stopName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  stopRoutes: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  stopDistance: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  controls: {
    position: 'absolute',
    right: 16,
    top: 200,
    gap: 8,
  },
  controlButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    flex: 1,
  },
  stopDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalStopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  modalActions: {
    marginTop: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#2E4BC6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2E4BC6',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#2E4BC6',
  },
  tertiaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ff6b35',
  },
  tertiaryButtonText: {
    color: '#ff6b35',
  },
});
