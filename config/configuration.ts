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
    baseUrl: 'https://api.openweathermap.org/data/2.5/forecast',
    apiKey: process.env.WEATHERAPI_APIKEY,
  },
  jwtModule: {
    secret: process.env.JWT_SECRET,
  },
  hashing: {
    salt: process.env.HASH_SALT,
  },
  logger: {
    pinoHttp: {
      customProps: (req, res) => ({
        context: 'HTTP',
      }),
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
          colorize: true,
        },
      },
      level: process.env.LOG_LEVEL,
    },
  },
});
