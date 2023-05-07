export default () => ({
  database: {
    dbName: 'WeatherAlerting',
    uri: `mongodb://${process.env.DB_HOST}:27017`,
    pass: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    ssl: Boolean(process.env.DB_SSL) || false,
    sslCA: process.env.DB_SSL_CA_FILE_PATH,
    connectTimeoutMS: 1000,
  },
  weatherApi: {
    apiKey: process.env.WEATHERAPI_APIKEY,
  },
  jwtModule: {
    secret: process.env.JWT_SECRET,
  },
});
