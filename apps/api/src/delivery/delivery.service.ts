import { Cron } from '@nestjs/schedule';
import { Delivery, Webhook } from '@prisma/client';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DeliveryRepository } from './repositories/delivery.repository';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    @Inject(DeliveryRepository)
    private readonly deliveryRepository: DeliveryRepository
  ) {}

  private async deliverWebhook(
    event: 'CREATE' | 'UPDATE',
    delivery: Delivery & { Webhook: Webhook }
  ) {
    //TODO: Deliver webhook with 'x-delivery-signature' header and payload: { "event": "UPDATE", "data": <delivery> }
  }

  async create(dto: CreateDeliveryDto) {
    const delivery = await this.deliveryRepository.create(dto.webhook_url);

    if (delivery.Webhook) {
      await this.deliverWebhook('CREATE', delivery);
    }

    return delivery;
  }

  async findAll() {
    return this.deliveryRepository.findMany();
  }

  async findOne(id: number) {
    return this.deliveryRepository.findUnique(id);
  }

  async update(id: number, data: Pick<Delivery, 'status'>) {
    const delivery = await this.deliveryRepository.update(id, data);

    if (delivery.Webhook) {
      await this.deliverWebhook('UPDATE', delivery);
    }

    return delivery;
  }

  async cancel(id: number) {
    return this.deliveryRepository.cancel(id);
  }

  @Cron('*/30 * * * * *')
  async handleCron() {
    // TODO: Shift the status of deliveries in the following order:  "DRAFT" -> "PENDING" , "PENDING" -> "FULFILLED"
  }
}
