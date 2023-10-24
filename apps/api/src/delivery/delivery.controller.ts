import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { XApiKeyGuard } from '../common/guards/x-api-key.guard';

@Controller('delivery')
@UseGuards(XApiKeyGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  findAll() {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.cancel(+id);
  }
}
