import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    bufferLogs: true,
  });
  // TODO: Configure CORS to allow only for frontend's origin
  // https://github.com/expressjs/cors#configuration-options
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  await app.listen(3000);
}
bootstrap();
