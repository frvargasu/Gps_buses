Set-Location "C:\Users\frvar\gpsbus"
Write-Host "📱 Iniciando Expo para iOS..." -ForegroundColor Green
Write-Host "🍎 Una vez que aparezca el QR, escanéalo con Expo Go en tu iPhone/iPad" -ForegroundColor Yellow
Write-Host "📍 La app pedirá permisos de ubicación - acepta para ver el GPS real" -ForegroundColor Cyan
npx expo start --ios
