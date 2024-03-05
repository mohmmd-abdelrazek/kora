#!/bin/sh

# Start the Next.js application
cd /app/frontend
npm run start &

# Start the Express.js application
cd /app/backend
npm run start &

wait_for_service() {
  SERVICE_HOST=$1
  SERVICE_PORT=$2
  echo "Waiting for ${SERVICE_HOST}:${SERVICE_PORT} to be ready..."
  while ! nc -z ${SERVICE_HOST} ${SERVICE_PORT}; do
    sleep 1
  done
  echo "${SERVICE_HOST}:${SERVICE_PORT} is up and running."
}

# Wait for the backend and frontend services to start
wait_for_service localhost 5000 # Adjust for your backend's port
wait_for_service localhost 3000

# Start Nginx in the foreground
nginx -g 'daemon off;'
