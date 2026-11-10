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
import { divisions } from '../data/mockData';
import { COLORS } from '../constants';

export default function DivisionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrow}>PASO 01 · TIPO DE SERVICIO</Text>
        </View>
        <Text style={styles.title}>¿Qué tipo de{'\n'}recorrido buscas?</Text>
        <Text style={styles.description}>
          Selecciona una división para ver las opciones disponibles.
        </Text>

        <View style={styles.divisionContainer}>
          {divisions.map((division, index) => (
            <TouchableOpacity
              key={division.id}
              accessibilityRole="button"
              style={[styles.divisionCard, index === 0 && styles.featuredCard]}
              onPress={() => navigation.navigate('ServiceType', { division })}
            >
              <View style={[styles.iconBox, index === 0 && styles.featuredIconBox]}>
                <Ionicons
                  name={division.icon}
                  size={25}
                  color={index === 0 ? COLORS.white : COLORS.primary}
                />
              </View>
              <View style={styles.cardCopy}>
                <Text style={[styles.divisionName, index === 0 && styles.featuredText]}>
                  {division.name}
                </Text>
                <Text style={[styles.cardHint, index === 0 && styles.featuredHint]}>
                  {index === 0 ? 'Recorridos y turnos' : 'Gestiones administrativas'}
                </Text>
              </View>
              <View style={[styles.arrowBox, index === 0 && styles.featuredArrowBox]}>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={index === 0 ? COLORS.primaryDark : COLORS.primary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.footerTip}>
          <Ionicons name="leaf-outline" size={17} color={COLORS.primary} />
          <Text style={styles.footerText}>Tu próximo viaje comienza aquí.</Text>
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
    paddingTop: 35,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  eyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  eyebrow: {
    color: COLORS.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  title: {
    marginTop: 16,
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 37,
  },
  description: {
    maxWidth: 320,
    marginTop: 10,
    marginBottom: 28,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  divisionContainer: {
    gap: 12,
  },
  divisionCard: {
    minHeight: 94,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    backgroundColor: COLORS.white,
  },
  featuredCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  iconBox: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
  },
  featuredIconBox: {
    backgroundColor: '#FFFFFF1C',
  },
  cardCopy: {
    flex: 1,
    marginLeft: 13,
  },
  divisionName: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '800',
  },
  featuredText: {
    color: COLORS.white,
  },
  cardHint: {
    marginTop: 4,
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  featuredHint: {
    color: '#D5E4D9',
  },
  arrowBox: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
  },
  featuredArrowBox: {
    backgroundColor: COLORS.accent,
  },
  footerTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 22,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
});
