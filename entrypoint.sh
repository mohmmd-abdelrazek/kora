#!/bin/sh

# Function to check if a service is ready
wait_for_service() {
  SERVICE_HOST=$1
  SERVICE_PORT=$2
  echo "Waiting for ${SERVICE_HOST}:${SERVICE_PORT} to be ready..."
  while ! nc -z ${SERVICE_HOST} ${SERVICE_PORT}; do
    sleep 1
  done
  echo "${SERVICE_HOST}:${SERVICE_PORT} is up and running."
}

# Start the Express.js (backend) application
echo "Starting backend service..."
cd /app/backend
npm run start &
wait_for_service localhost 5000

# Start the Next.js (frontend) application
echo "Starting frontend service..."
cd /app/frontend
npm run start &
wait_for_service localhost 3000

# Start Nginx in the foreground
echo "Starting Nginx..."
nginx -g 'daemon off;'
