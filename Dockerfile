FROM node:16-alpine AS development

# Specify our working directory inside the container
WORKDIR /usr/src/weather-alerting-backend

# Copy the package.jsons from host to container
COPY package*.json ./

# Install all dependencies
RUN npm install

COPY . .
RUN npm run build
RUN wget -P /etc/ssl/ https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem

# Install git - needed for development in .devcontainer
RUN apk add --no-cache git

####################
#   PRODUCTION     #
####################
FROM node:16-alpine AS production
# Specify our working directory inside the container
WORKDIR /usr/src/weather-alerting-backend

# Copy all from development stage
COPY --from=development /usr/src/weather-alerting-backend .

EXPOSE 3000

# Run application
CMD ["node","dist/src/main.js"]
