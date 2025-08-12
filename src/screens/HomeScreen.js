import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E4BC6" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inicio</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Gps</Text>
        <Text style={styles.subtitle}>Transporte y Turismo</Text>
      </View>

      {/* Company Name */}
      <View style={styles.companyContainer}>
        <Text style={styles.companyName}>Gps buses</Text>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('Division')}
        >
          <Ionicons name="bus" size={40} color="#2E4BC6" />
          <Text style={styles.buttonText}>Recorridos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('Paradas')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="location" size={20} color="#2E4BC6" />
            <Ionicons name="bus" size={40} color="#2E4BC6" />
          </View>
          <Text style={styles.buttonText}>Paradas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('FullMap')}
        >
          <Ionicons name="map" size={40} color="#2E4BC6" />
          <Text style={styles.buttonText}>Mapa Completo</Text>
        </TouchableOpacity>
      </View>
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
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E4BC6',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16,
    color: '#2E4BC6',
    fontStyle: 'italic',
    marginTop: 5,
  },
  companyContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    paddingHorizontal: 40,
    gap: 20,
  },
  mainButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2E4BC6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
});
