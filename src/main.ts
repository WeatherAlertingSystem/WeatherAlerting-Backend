import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  // TODO: Configure CORS to allow only for frontend's origin
  // https://github.com/expressjs/cors#configuration-options
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
