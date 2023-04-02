FROM node:16-alpine
WORKDIR /usr/src/weather-alerting-backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN wget -P /etc/ssl/ https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem
EXPOSE 3000
CMD ["node","dist/main.js"]
