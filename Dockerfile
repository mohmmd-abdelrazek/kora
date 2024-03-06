FROM node:18-alpine

RUN apk update && apk add --no-cache nginx
RUN mkdir -p /run/nginx

WORKDIR /app
COPY ./frontend ./frontend
COPY ./backend ./backend
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY entrypoint.sh /entrypoint.sh

WORKDIR /app/frontend
RUN npm install && npm run build

WORKDIR /app/backend
RUN npm install && npm run build

RUN chmod +x /entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["/entrypoint.sh"]
