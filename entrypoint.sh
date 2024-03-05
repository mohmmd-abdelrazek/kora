#!/bin/sh

# Placeholder function for starting Nginx with a temporary config
# This config should just be enough to respond on port 80, making Render.com recognize it.
start_nginx_temporarily() {
    nginx -c /path/to/temporary/nginx.conf
    # This temporary config might just serve a static file or a simple 200 OK response
}

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

# Actual script execution starts here
echo "Starting temporary Nginx to capture port 80..."
start_nginx_temporarily

echo "Starting frontend service..."
cd /app/frontend
npm run start &
wait_for_service localhost 3000

echo "Starting backend service..."
cd /app/backend
npm run start &
wait_for_service localhost 5000

# After confirming backend and frontend readiness, switch to the full Nginx configuration
# This might involve stopping the temporary Nginx and starting it with the full configuration
echo "Switching to full Nginx configuration..."
nginx -s stop
nginx -g 'daemon off;'
