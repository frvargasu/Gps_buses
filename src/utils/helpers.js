// Utility functions for the GPSBus app
import { COLORS } from '../constants';

export const formatTime = (timeString) => {
  const time = new Date(`2000-01-01T${timeString}`);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'iniciado':
      return COLORS.success;
    case 'en_ruta':
      return COLORS.warning;
    case 'terminado':
      return '#9E9E9E';
    case 'cancelado':
      return COLORS.error;
    default:
      return COLORS.primary;
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export const getDirectionText = (direction) => {
  return direction === 'towards' ? 'Viajes hacia' : 'Viajes desde';
};

export const searchFilter = (items, query, fields) => {
  if (!query) return items;
  
  const lowercaseQuery = query.toLowerCase();
  return items.filter(item => 
    fields.some(field => 
      item[field]?.toString().toLowerCase().includes(lowercaseQuery)
    )
  );
};

export const sortRoutesByTime = (routes) => {
  return [...routes].sort((a, b) => 
    a.departureTime.localeCompare(b.departureTime)
  );
};

export const groupRoutesByDestination = (routes) => {
  return routes.reduce((acc, route) => {
    const destination = route.destination;
    if (!acc[destination]) {
      acc[destination] = [];
    }
    acc[destination].push(route);
    return acc;
  }, {});
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
