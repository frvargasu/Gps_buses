import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const shortcuts = [
  { title: 'Recorridos', subtitle: 'Horarios y destinos', icon: 'bus-outline', screen: 'Division' },
  { title: 'Paradas', subtitle: 'Encuentra tu parada', icon: 'location-outline', screen: 'Paradas' },
  { title: 'Explorar mapa', subtitle: 'Santiago y alrededores', icon: 'map-outline', screen: 'FullMap' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topbar}>
          <View style={styles.brand}>
            <View style={styles.brandIcon}>
              <Ionicons name="bus" size={20} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.brandTitle}>GPS Buses</Text>
              <Text style={styles.brandCaption}>TRANSPORTE Y TURISMO</Text>
            </View>
          </View>
          <View style={styles.cityBadge}>
            <Ionicons name="location" size={14} color={COLORS.primary} />
            <Text style={styles.cityText}>Santiago</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroOrbLarge} />
          <View style={styles.heroOrbSmall} />
          <View style={styles.heroLabel}>
            <View style={styles.heroLabelDot} />
            <Text style={styles.heroLabelText}>TU CIUDAD, MÁS CERCA</Text>
          </View>
          <Text style={styles.heroTitle}>Muévete{'\n'}a tu ritmo.</Text>
          <Text style={styles.heroDescription}>
            Encuentra recorridos y paradas para planificar tu próximo viaje.
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.heroButton}
            onPress={() => navigation.navigate('Division')}
          >
            <Text style={styles.heroButtonText}>Explorar recorridos</Text>
            <Ionicons name="arrow-forward" size={17} color={COLORS.primaryDark} />
          </TouchableOpacity>
          <View style={styles.heroIllustration}>
            <Ionicons name="bus" size={72} color="#FFFFFF24" />
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionEyebrow}>PLANIFICA TU VIAJE</Text>
            <Text style={styles.sectionTitle}>¿Qué necesitas?</Text>
          </View>
          <View style={styles.sectionAccent} />
        </View>

        <View style={styles.shortcutList}>
          {shortcuts.map((shortcut, index) => (
            <TouchableOpacity
              key={shortcut.title}
              accessibilityRole="button"
              style={styles.shortcut}
              onPress={() => navigation.navigate(shortcut.screen)}
            >
              <View style={[styles.shortcutIcon, index === 0 && styles.shortcutIconPrimary]}>
                <Ionicons
                  name={shortcut.icon}
                  size={22}
                  color={index === 0 ? COLORS.white : COLORS.primary}
                />
              </View>
              <View style={styles.shortcutCopy}>
                <Text style={styles.shortcutTitle}>{shortcut.title}</Text>
                <Text style={styles.shortcutSubtitle}>{shortcut.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={19} color="#98A198" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.note}>
          <Ionicons name="information-circle-outline" size={17} color={COLORS.primary} />
          <Text style={styles.noteText}>Horarios y ubicaciones actualmente de ejemplo.</Text>
        </View>
      </ScrollView>
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
    maxWidth: 680,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 30,
  },
  topbar: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: COLORS.primary,
  },
  brandTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },
  brandCaption: {
    marginTop: 2,
    color: COLORS.textLight,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
  },
  cityText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  hero: {
    minHeight: 244,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 24,
    backgroundColor: COLORS.primaryDark,
  },
  heroOrbLarge: {
    width: 210,
    height: 210,
    position: 'absolute',
    top: -72,
    right: -53,
    borderRadius: 110,
    backgroundColor: '#FFFFFF0C',
  },
  heroOrbSmall: {
    width: 128,
    height: 128,
    position: 'absolute',
    right: 32,
    bottom: -88,
    borderRadius: 70,
    backgroundColor: COLORS.accent,
    opacity: 0.18,
  },
  heroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 12,
  },
  heroLabelDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
  },
  heroLabelText: {
    color: '#DCE9D4',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  heroDescription: {
    maxWidth: 290,
    marginTop: 9,
    color: '#D2DED4',
    fontSize: 12,
    lineHeight: 18,
  },
  heroButton: {
    minHeight: 40,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 17,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
  },
  heroButtonText: {
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: '800',
  },
  heroIllustration: {
    position: 'absolute',
    right: 25,
    bottom: 24,
    transform: [{ rotate: '-12deg' }],
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 27,
    marginBottom: 12,
  },
  sectionEyebrow: {
    color: COLORS.secondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  sectionTitle: {
    marginTop: 3,
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
  },
  sectionAccent: {
    width: 36,
    height: 5,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  shortcutList: {
    gap: 9,
  },
  shortcut: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  shortcutIcon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: COLORS.primaryLight,
  },
  shortcutIconPrimary: {
    backgroundColor: COLORS.primary,
  },
  shortcutCopy: {
    flex: 1,
    marginLeft: 12,
  },
  shortcutTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  shortcutSubtitle: {
    marginTop: 3,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 14,
    paddingHorizontal: 3,
  },
  noteText: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },
});
