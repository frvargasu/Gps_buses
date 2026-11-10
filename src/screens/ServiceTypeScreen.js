import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { serviceTypes } from '../data/mockData';
import { COLORS } from '../constants';

export default function ServiceTypeScreen({ navigation, route }) {
  const { division } = route.params;

  const handleServiceSelect = (serviceType) => {
    navigation.navigate('Routes', { division, serviceType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>
        <View style={styles.divisionPill}>
          <Ionicons name="business-outline" size={14} color={COLORS.primary} />
          <Text style={styles.divisionPillText}>{division.name}</Text>
        </View>
        <Text style={styles.title}>Elige la dirección</Text>
        <Text style={styles.description}>¿Hacia dónde necesitas viajar?</Text>

        <View style={styles.serviceContainer}>
          {serviceTypes.map((service, index) => (
            <TouchableOpacity
              key={service.id}
              accessibilityRole="button"
              style={styles.serviceCard}
              onPress={() => handleServiceSelect(service)}
            >
              <View style={[styles.iconCircle, index === 0 && styles.iconCirclePrimary]}>
                <Ionicons
                  name={service.icon}
                  size={24}
                  color={index === 0 ? COLORS.white : COLORS.primary}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </View>
              <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="time-outline" size={18} color={COLORS.primary} />
          </View>
          <Text style={styles.infoText}>Consulta horarios y destinos antes de salir.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingTop: 30,
  },
  divisionPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
  },
  divisionPillText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  title: {
    marginTop: 18,
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  description: {
    marginTop: 5,
    marginBottom: 25,
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  serviceContainer: {
    gap: 12,
  },
  serviceCard: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 17,
    backgroundColor: COLORS.white,
  },
  iconCircle: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
  },
  iconCirclePrimary: {
    backgroundColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
    marginLeft: 13,
  },
  serviceTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '800',
  },
  serviceSubtitle: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    padding: 13,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
  },
  infoIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  infoText: {
    flex: 1,
    color: COLORS.primaryDark,
    fontSize: 11,
    lineHeight: 16,
  },
});
