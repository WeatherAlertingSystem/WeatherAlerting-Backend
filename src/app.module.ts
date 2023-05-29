import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseOptionsFactory } from '@nestjs/mongoose';
import configuration from 'config/configuration';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WeatherEngineModule } from './weather-engine/weather-engine.module';
import configuration from 'config/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherTriggerModule } from './weather-trigger/weather-trigger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<MongooseOptionsFactory>('database'),
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AdminModule,
    WeatherTriggerModule,
    WeatherEngineModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
