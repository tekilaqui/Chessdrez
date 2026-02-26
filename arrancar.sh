#!/bin/bash

# Script robusto para arrancar Chess Platform
echo "🚀 Iniciando configuración de Chess Platform..."

# 1. Definir IP
# 1. Definir IP dinámica
LOCAL_IP=$(hostname -I | awk '{print $1}')
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP="localhost"
fi
echo "📍 IP Local detectada: $LOCAL_IP"

# 2. Actualizar configuración de la Web
echo "📝 Actualizando .env de la aplicación Web..."
sed -i "s|VITE_API_URL=.*|VITE_API_URL=http://$LOCAL_IP:3000|g" apps/web/.env
sed -i "s|VITE_WS_URL=.*|VITE_WS_URL=ws://$LOCAL_IP:3001|g" apps/web/.env

# 2. Instalar dependencias
echo "📦 Instalando dependencias (usando npx pnpm)..."
npx -y pnpm install --frozen-lockfile

# 3. Inicializar Base de Datos (Prisma)
echo "💾 Inicializando base de datos SQLite..."
npx -y pnpm --filter api exec prisma generate
npx -y pnpm --filter api exec prisma db push --skip-generate

# 4. Mostrar instrucciones para el móvil
echo "----------------------------------------------------"
echo "📱 PARA ABRIR EN EL MÓVIL:"
echo "   http://$LOCAL_IP:5173"
echo "----------------------------------------------------"

# 5. Arrancar servidores (Solo esenciales para evitar errores de Redis)
echo "🔥 Arrancando servidores (Web y API)..."
npx -y pnpm --filter web --filter api dev
