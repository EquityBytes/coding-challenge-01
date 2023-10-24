import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { PrismaService } from '../common/prisma/prisma.service';
import { DeliveryRepository } from './repositories/delivery.repository';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [DeliveryController],
  providers: [PrismaService, DeliveryRepository, DeliveryService],
})
export class DeliveryModule {}
