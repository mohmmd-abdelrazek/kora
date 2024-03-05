# Use Node.js as the base image
FROM node:18-alpine

# Install Nginx
RUN apk update && apk add --no-cache nginx netcat-openbsd

# Create a directory for Nginx run files and logs
RUN mkdir -p /run/nginx

# Set the working directory for the application
WORKDIR /app

# Copy the frontend and backend applications
COPY ./frontend ./frontend
COPY ./backend ./backend
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY entrypoint.sh /entrypoint.sh

# Build the frontend (Next.js)
WORKDIR /app/frontend
RUN npm install && npm run build

# Build the backend (Express.js)
WORKDIR /app/backend
RUN npm install && npm run build

# # Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# # Expose port 80 for Nginx
EXPOSE 80

# # Use the custom entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
