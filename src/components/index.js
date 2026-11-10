import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

export const Card = ({ children, style, onPress }) => (
  <TouchableOpacity 
    style={[styles.card, style]} 
    onPress={onPress}
    disabled={!onPress}
  >
    {children}
  </TouchableOpacity>
);

export const RouteCard = ({ route, onPress }) => (
  <Card onPress={onPress} style={styles.routeCard}>
    <View style={styles.routeHeader}>
      <View style={styles.busIconContainer}>
        <Ionicons name="bus" size={32} color="#fff" />
      </View>
      <View style={styles.routeInfo}>
        <Text style={styles.routeTime}>
          {route.departureTime.slice(0, 5)} {route.destination}
        </Text>
        <Text style={styles.scheduleText}>
          Hora salida: {route.departureTime}
        </Text>
        <Text style={styles.scheduleText}>
          Hora llegada: {route.arrivalTime}
        </Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>ESTADO: </Text>
          <Text style={[styles.statusValue, { color: COLORS.success }]}>
            {route.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.locationButton}>
        <Ionicons name="location" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
    
    <View style={styles.routeDetails}>
      <Text style={styles.originText}>Inicio: {route.origin}</Text>
      <Text style={styles.busText}>Bus {route.name}</Text>
    </View>
  </Card>
);

export const Button = ({ title, onPress, style, textStyle, icon }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    {icon && <Ionicons name={icon} size={20} color="#fff" style={styles.buttonIcon} />}
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
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
  routeCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  routeHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  busIconContainer: {
    backgroundColor: COLORS.primary,
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
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
