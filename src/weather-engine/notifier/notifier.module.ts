import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotifierService } from './notifier.service';

@Module({
  imports: [MailerModule, ConfigModule],
  providers: [NotifierService],
  exports: [NotifierService],
})
export class NotifierModule {}
