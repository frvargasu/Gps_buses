// Mock data for bus routes and schedules
export const busRoutes = [
  {
    id: '711',
    name: '711_BUS',
    destination: 'Pudahuel - WEP',
    departureTime: '04:45:00',
    arrivalTime: '06:15:00',
    status: 'INICIADO',
    origin: 'Av.Carrascal - Neptuno',
    division: 'Turno',
    direction: 'towards'
  },
  {
    id: '743',
    name: '743_BUS',
    destination: 'San Jose Estrella - WEP',
    departureTime: '04:50:00',
    arrivalTime: '06:15:00',
    status: 'INICIADO',
    origin: 'Santa Rosa - San Pedro',
    division: 'Turno',
    direction: 'towards'
  },
  {
    id: '723',
    name: '723_BUS',
    destination: 'Colina - WCDP',
    departureTime: '04:50:00',
    arrivalTime: '06:20:00',
    status: 'INICIADO',
    origin: 'Gral. San Martin / Lo Seco',
    division: 'Turno',
    direction: 'towards'
  },
  {
    id: '738',
    name: '738_BUS',
    destination: 'Curacavi - WEP',
    departureTime: '04:50:00',
    arrivalTime: '06:00:00',
    status: 'INICIADO',
    origin: 'Ambrosio Ohiggins / Agua Potable',
    division: 'Turno',
    direction: 'towards'
  }
];

export const busStops = [
  {
    id: 1,
    name: 'Estación Central',
    latitude: -33.4569,
    longitude: -70.6983,
    routes: ['711', '743', '723']
  },
  {
    id: 2,
    name: 'Santiago Centro',
    latitude: -33.4489,
    longitude: -70.6693,
    routes: ['711', '738']
  },
  {
    id: 3,
    name: 'Pudahuel',
    latitude: -33.4400,
    longitude: -70.7600,
    routes: ['711']
  },
  {
    id: 4,
    name: 'San Bernardo',
    latitude: -33.5908,
    longitude: -70.7008,
    routes: ['743']
  }
];

export const divisions = [
  { id: 'turno', name: 'Turno', icon: 'people' },
  { id: 'administrativo', name: 'Administrativo', icon: 'business' }
];

export const serviceTypes = [
  { id: 'towards', name: 'Viajes hacia', subtitle: 'Turno', icon: 'arrow-forward' },
  { id: 'from', name: 'Viajes desde', subtitle: 'Turno', icon: 'arrow-back' }
];
