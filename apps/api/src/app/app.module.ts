import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { DeliveryModule } from '../delivery/delivery.module';

@Module({
  imports: [DeliveryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
