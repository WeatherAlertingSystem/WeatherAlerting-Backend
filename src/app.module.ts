import { Module } from '@nestjs/common';
import { MongooseModule, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { WeatherTriggerModule } from './weather-trigger/weather-trigger.module';
import { WeatherEngineModule } from './weather-engine/weather-engine.module';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<MongooseOptionsFactory>('database'),
    }),
    UserModule,
    AdminModule,
    WeatherTriggerModule,
    WeatherEngineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
