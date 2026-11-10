# GPSBus - Aplicación de Transporte Público

Una aplicación híbrida de transporte público, desarrollada con React Native y Expo que funciona en web, Android e iOS.

## 🚀 Características

- **Múltiples plataformas**: Web, Android e iOS
- **Información de rutas**: Horarios, destinos y estado de ejemplo
- **Mapas integrados**: Mapas OpenStreetMap interactivos en web, Android e iOS
- **Búsqueda**: Filtra paradas por nombre o número de recorrido
- **Indicaciones**: Abre una parada en la aplicación de mapas del dispositivo
- **Divisiones de servicio**: Turno y Administrativo
- **Direcciones de viaje**: Hacia y desde ubicaciones específicas
- **Interfaz intuitiva**: Diseño limpio inspirado en aplicaciones modernas de transporte

## 🛠️ Tecnologías Utilizadas

- **React Native** con Expo
- **React Navigation** para navegación
- **OpenStreetMap** mediante Leaflet en web y mosaicos OSM en móvil
- **React Native Maps** para la vista nativa del mapa
- **Expo Location** para geolocalización
- **Expo Vector Icons** para iconografía
- **JavaScript/ES6+**

## 📱 Pantallas Principales

1. **Inicio**: Pantalla principal con acceso a recorridos y paradas
2. **División**: Selección entre Turno y Administrativo
3. **Tipo de Servicio**: Viajes hacia o desde ubicaciones
4. **Rutas**: Lista de rutas con horarios y información detallada
5. **Mapa**: Visualización interactiva de paradas de autobús
6. **Paradas**: Lista de paradas disponibles

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI
- Para desarrollo móvil: Android Studio (Android) o Xcode (iOS)

### Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd gpsbus
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

## 📱 Ejecutar la Aplicación

### Web
```bash
npm run web
```

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── screens/            # Pantallas principales
│   ├── HomeScreen.js
│   ├── DivisionScreen.js
│   ├── ServiceTypeScreen.js
│   ├── RoutesScreen.js
│   ├── MapScreen.js
│   └── StopsScreen.js
├── navigation/         # Configuración de navegación
│   └── AppNavigator.js
└── data/              # Datos mock y utilidades
    └── mockData.js
```

## 🎨 Diseño

La aplicación utiliza una paleta de verde bosque, salvia y lima suave, con componentes adaptados para web, Android e iOS.

## 🔧 Configuración de Desarrollo

### VS Code
Se recomienda instalar las siguientes extensiones:
- React Native Tools
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter

### Mapas OpenStreetMap

El mapa no requiere API key. La aplicación muestra los datos de paradas que están
en `src/data/mockData.js`; por ahora son datos de ejemplo. La línea del recorrido
conecta esas paradas en el orden del archivo y no representa el trazado oficial
por calles ni la ubicación de buses en tiempo real. Las indicaciones se abren en
la aplicación de mapas del dispositivo.

Se muestra la atribución requerida a OpenStreetMap. El servidor público de
mosaicos de OSM está sujeto a una política de uso y no ofrece garantía de
disponibilidad; para un despliegue con tráfico se debe contratar o configurar un
proveedor de mosaicos adecuado.

## 📝 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo Expo
- `npm run android`: Ejecuta en emulador/dispositivo Android
- `npm run ios`: Ejecuta en simulador/dispositivo iOS
- `npm run web`: Ejecuta en navegador web

## 🔜 Características Futuras

- [ ] Integración con datos reales de rutas y paradas
- [ ] Posiciones de buses en tiempo real mediante una API del operador o GTFS-Realtime
- [ ] Notificaciones push para alertas de rutas
- [ ] Modo offline para información básica
- [ ] Estimaciones de tiempo en tiempo real
- [ ] Favoritos y rutas guardadas
- [ ] Integración con sistemas de pago

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre un issue primero para discutir qué te gustaría cambiar.





---
