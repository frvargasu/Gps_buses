// Constants for the GPSBus application

export const COLORS = {
  primary: '#24543B',
  primaryDark: '#183B2A',
  primaryLight: '#E8F0E7',
  accent: '#B8D66B',
  secondary: '#D27A4B',
  success: '#4E8B5D',
  warning: '#D09A4A',
  error: '#C45C4A',
  background: '#F3F6F0',
  white: '#ffffff',
  text: '#1D2B22',
  textSecondary: '#66736A',
  textLight: '#8D978F',
  border: '#DDE5DB',
  shadow: '#000000',
};

export const SIZES = {
  // Padding and margins
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  
  // Font sizes
  fontXs: 12,
  fontSm: 14,
  fontMd: 16,
  fontLg: 18,
  fontXl: 24,
  fontXxl: 32,
  fontDisplay: 48,
  
  // Border radius
  borderRadius: 12,
  borderRadiusSmall: 8,
  borderRadiusLarge: 16,
  
  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 40,
};

export const ROUTES = {
  HOME: 'Home',
  DIVISION: 'Division',
  SERVICE_TYPE: 'ServiceType',
  ROUTES: 'Routes',
  MAP: 'Map',
  STOPS: 'Stops',
  RECORRIDOS: 'Recorridos',
  PARADAS: 'Paradas',
  MAPA: 'Mapa',
};

export const BUS_STATUS = {
  INICIADO: 'INICIADO',
  EN_RUTA: 'EN_RUTA',
  TERMINADO: 'TERMINADO',
  CANCELADO: 'CANCELADO',
};

export const DIVISION_TYPES = {
  TURNO: 'turno',
  ADMINISTRATIVO: 'administrativo',
};

export const SERVICE_TYPES = {
  TOWARDS: 'towards',
  FROM: 'from',
};

export const MAP_CONFIG = {
  DEFAULT_REGION: {
    latitude: -33.4489,
    longitude: -70.6693,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  ZOOM_LEVEL: {
    CITY: 0.1,
    NEIGHBORHOOD: 0.05,
    STREET: 0.01,
  },
};

export const PERMISSIONS = {
  LOCATION: {
    ANDROID: [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
    ],
    IOS: [
      'NSLocationWhenInUseUsageDescription',
      'NSLocationAlwaysAndWhenInUseUsageDescription',
    ],
  },
};

export const API_ENDPOINTS = {
  // Add your API endpoints here when integrating with real backend
  ROUTES: '/api/routes',
  STOPS: '/api/stops',
  REAL_TIME: '/api/realtime',
};
