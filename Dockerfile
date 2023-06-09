FROM node:16 AS development

# Specify our working directory inside the container
WORKDIR /usr/src/weather-alerting-backend

# Copy the package.jsons from host to container
COPY package*.json ./

# Install all dependencies
RUN npm install
RUN npm install -g @nestjs/cli
RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install pre-commit

COPY . .
RUN npm run build
RUN wget -P /etc/ssl/ https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem


####################
#   PRODUCTION     #
####################
FROM node:16-alpine AS production
# Specify our working directory inside the container
WORKDIR /usr/src/weather-alerting-backend

# Copy all from development stage
COPY --from=development /usr/src/weather-alerting-backend .
COPY --from=development /etc/ssl/rds-combined-ca-bundle.pem /etc/ssl/rds-combined-ca-bundle.pem

EXPOSE 3000

# Run application
CMD ["node","dist/src/main.js"]
