#!/bin/sh
# Modified wait_for_service to accommodate service startup sequence
wait_for_service() {
  SERVICE_HOST=$1
  SERVICE_PORT=$2
  echo "Waiting for ${SERVICE_HOST}:${SERVICE_PORT} to be ready..."
  while ! nc -z ${SERVICE_HOST} ${SERVICE_PORT}; do
    sleep 1
  done
  echo "${SERVICE_HOST}:${SERVICE_PORT} is up and running."
}

echo "Starting frontend service..."
cd /app/frontend
npm run start &
wait_for_service localhost 3000

echo "Starting backend service..."
cd /app/backend
npm run start &
wait_for_service localhost 5000

echo "Starting Nginx..."
nginx -g 'daemon off;'
