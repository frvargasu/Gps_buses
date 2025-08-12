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
import { serviceTypes } from '../data/mockData';

export default function ServiceTypeScreen({ navigation, route }) {
  const { division } = route.params;

  const handleServiceSelect = (serviceType) => {
    navigation.navigate('Routes', { division, serviceType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E4BC6" />
      
      <View style={styles.header}>
        <Ionicons name="bus" size={40} color="#2E4BC6" />
        <Text style={styles.headerTitle}>Selección de servicios</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.serviceContainer}>
          {serviceTypes.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceButton}
              onPress={() => handleServiceSelect(service)}
            >
              <View style={styles.iconCircle}>
                <Ionicons 
                  name={service.icon} 
                  size={32} 
                  color="#2E4BC6" 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    gap: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  serviceContainer: {
    gap: 20,
  },
  serviceButton: {
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
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
