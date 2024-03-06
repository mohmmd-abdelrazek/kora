wait_for_service() {
  SERVICE_HOST=$1
  SERVICE_PORT=$2
  echo "Waiting for ${SERVICE_HOST}:${SERVICE_PORT} to be ready..."
  while ! nc -z ${SERVICE_HOST} ${SERVICE_PORT}; do
    sleep 1
  done
  echo "${SERVICE_HOST}:${SERVICE_PORT} is up and running."
}

echo "Starting Nginx with the initial configuration..."
nginx -g 'daemon off;' &

echo "Waiting a bit for Nginx to initialize..."
sleep 10

echo "Starting frontend service..."
cd /app/frontend
npm run start &
wait_for_service localhost 3000

echo "Starting backend service..."
cd /app/backend
npm run start &
wait_for_service localhost 5000

echo "Updating Nginx configuration to the final setup..."
cp /etc/nginx/final.conf /etc/nginx/nginx.conf
echo "Reloading Nginx..."
nginx -s reload

echo "All services are up and running."
wait $!