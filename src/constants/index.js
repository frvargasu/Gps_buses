// Constants for the GPSBus application

export const COLORS = {
  primary: '#2E4BC6',
  primaryLight: '#f0f4ff',
  secondary: '#FF9800',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  background: '#f5f5f5',
  white: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#e0e0e0',
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
