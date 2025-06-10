#!/bin/bash

# Nombre del volumen y contenedor
VOLUME_NAME="deploy_db_data"
CONTAINER_NAME="deploy-db-1"

echo "🛑 Deteniendo contenedor $CONTAINER_NAME..."
docker stop "$CONTAINER_NAME"

echo "🗑️ Eliminando volumen $VOLUME_NAME..."
docker volume rm "$VOLUME_NAME"

echo "✅ Volumen eliminado. El contenedor se reiniciará y el volumen se recreará vacío al levantarlo."