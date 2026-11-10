import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import DivisionScreen from '../screens/DivisionScreen';
import ServiceTypeScreen from '../screens/ServiceTypeScreen';
import RoutesScreen from '../screens/RoutesScreen';
import MapScreen from '../screens/MapScreen';
import StopsScreen from '../screens/StopsScreen';
import FullMapScreen from '../screens/FullMapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Routes Stack Navigator
function RoutesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primaryDark,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Division" 
        component={DivisionScreen} 
        options={{ title: 'División' }}
      />
      <Stack.Screen 
        name="ServiceType" 
        component={ServiceTypeScreen} 
        options={{ title: 'Servicios' }}
      />
      <Stack.Screen 
        name="Routes" 
        component={RoutesScreen} 
        options={{ title: 'Recorridos' }}
      />
      <Stack.Screen 
        name="FullMap" 
        component={FullMapScreen} 
        options={{ 
          title: 'Mapa Completo',
          headerShown: false 
        }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Recorridos') {
            iconName = focused ? 'bus' : 'bus-outline';
          } else if (route.name === 'Paradas') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#89938B',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        tabBarStyle: {
          height: 62,
          paddingTop: 6,
          paddingBottom: 6,
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Recorridos" component={RoutesStack} />
      <Tab.Screen name="Paradas" component={StopsScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
