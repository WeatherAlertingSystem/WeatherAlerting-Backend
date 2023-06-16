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
    expiresIn: '1d',
  },
  hashing: {
    salt: process.env.HASH_SALT,
  },
  logger: {
    pinoHttp: {
      customProps: (req, res) => ({
        context: 'HTTP',
      }),
      customLogLevel: function (req, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return 'warn';
        } else if (res.statusCode >= 500 || err) {
          return 'error';
        } else if (res.statusCode >= 300 && res.statusCode < 400) {
          return 'silent';
        }
        return 'info';
      },
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
  mailing: {
    nodemailerConfig: {
      transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE == 'true' ? true : false,
        requireTLS: process.env.SMTP_REQUIRE_TLS == 'true' ? true : false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: '"Weather Alerting - No Reply" <no-reply.weather-alerting@horyzont.eu>',
      },
    },
    sendEmails: false,
  },
});
