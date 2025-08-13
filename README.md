# GPSBus - Aplicación de Transporte Público

Una aplicación híbrida de transporte público, desarrollada con React Native y Expo que funciona en web, Android e iOS.

## 🚀 Características

- **Múltiples plataformas**: Web, Android e iOS
- **Información de rutas**: Horarios, destinos y estado en tiempo real
- **Mapas integrados**: Visualización de paradas de autobús y rutas
- **Búsqueda**: Encuentra rutas y paradas fácilmente
- **Divisiones de servicio**: Turno y Administrativo
- **Direcciones de viaje**: Hacia y desde ubicaciones específicas
- **Interfaz intuitiva**: Diseño limpio inspirado en aplicaciones modernas de transporte

## 🛠️ Tecnologías Utilizadas

- **React Native** con Expo
- **React Navigation** para navegación
- **React Native Maps** para mapas
- **Expo Location** para geolocalización
- **Expo Vector Icons** para iconografía
- **JavaScript/ES6+**

## 📱 Pantallas Principales

1. **Inicio**: Pantalla principal con acceso a recorridos y paradas
2. **División**: Selección entre Turno y Administrativo
3. **Tipo de Servicio**: Viajes hacia o desde ubicaciones
4. **Rutas**: Lista de rutas con horarios y información detallada
5. **Mapa**: Visualización interactiva de paradas de autobús
6. **Paradas**: Lista de todas las paradas disponibles

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

La aplicación utiliza una paleta de colores azul (#2E4BC6) como color principal, siguiendo las mejores prácticas de Material Design para Android y Human Interface Guidelines para iOS.

## 🔧 Configuración de Desarrollo

### VS Code
Se recomienda instalar las siguientes extensiones:
- React Native Tools
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter

### Configuración de Mapas

Para usar mapas en dispositivos físicos, necesitarás configurar:
- **Android**: Google Maps API Key
- **iOS**: Apple Maps (incluido por defecto)

## 📝 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo Expo
- `npm run android`: Ejecuta en emulador/dispositivo Android
- `npm run ios`: Ejecuta en simulador/dispositivo iOS
- `npm run web`: Ejecuta en navegador web

## 🔜 Características Futuras

- [ ] Integración con APIs reales de transporte público
- [ ] Notificaciones push para alertas de rutas
- [ ] Modo offline para información básica
- [ ] Estimaciones de tiempo en tiempo real
- [ ] Favoritos y rutas guardadas
- [ ] Integración con sistemas de pago

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre un issue primero para discutir qué te gustaría cambiar.





---

