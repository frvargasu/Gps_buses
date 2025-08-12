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
import { divisions } from '../data/mockData';

export default function DivisionScreen({ navigation }) {
  const handleDivisionSelect = (division) => {
    navigation.navigate('ServiceType', { division });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E4BC6" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Seleccione división para ver servicios</Text>
        
        <View style={styles.divisionContainer}>
          {divisions.map((division) => (
            <TouchableOpacity
              key={division.id}
              style={styles.divisionButton}
              onPress={() => handleDivisionSelect(division)}
            >
              <Ionicons 
                name={division.icon} 
                size={32} 
                color="#2E4BC6" 
                style={styles.icon}
              />
              <Text style={styles.divisionText}>{division.name}</Text>
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
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  divisionContainer: {
    gap: 20,
  },
  divisionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
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
  icon: {
    marginRight: 15,
  },
  divisionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
