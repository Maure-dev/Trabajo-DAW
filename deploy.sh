#!/bin/bash
set -e

# Cargar variables del back manualmente
set -a
source ./back/.env
set +a

ENV="$2"

case "$1" in
  start)
    if [ "$ENV" == "--env=back" ]; then
      docker compose -f ./deploy/docker-compose.yml up back-api
    elif [ "$ENV" == "--env=front" ]; then
      docker compose -f ./deploy/docker-compose.yml up front-app
    else
      docker compose -f ./deploy/docker-compose.yml up
    fi
    ;;
  stop)
    docker compose -f ./deploy/docker-compose.yml down
    ;;
  *)
    echo "Uso: ./deploy.sh start|stop [--env=back|--env=front]"
    ;;
esac
