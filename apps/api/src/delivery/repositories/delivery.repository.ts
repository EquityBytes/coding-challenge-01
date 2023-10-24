import _ from 'lodash';
import { faker } from '@faker-js/faker';
import { Delivery, Prisma } from '@prisma/client';
import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class DeliveryRepository {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) {}

  async create(webhook_url?: string) {
    const generateAddress =
      (): Prisma.AddressCreateWithoutDeliveriesFromInput => ({
        id: faker.string.uuid(),
        address_line_1: faker.person.fullName(),
        address_line_2: faker.location.streetAddress(),
        zip_code: faker.location.zipCode(),
        city: faker.location.city(),
        county: faker.location.county(),
        country: faker.location.country(),
      });

    const from = generateAddress();
    const to = generateAddress();

    const count = faker.number.int({ min: 1, max: 5 });

    const articles: Prisma.ArticleCreateWithoutDeliveriesInput[] = _.times(
      count
    ).map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
    }));

    const delivery = await this.prismaService.delivery.create({
      data: {
        Articles: { create: articles },
        From: { create: from },
        To: { create: to },
        ...(webhook_url && {
          Webhook: {
            connectOrCreate: {
              where: { url: webhook_url },
              create: {
                url: webhook_url,
              },
            },
          },
        }),
      },
      include: { Articles: true, From: true, To: true, Webhook: true },
    });

    return delivery;
  }

  async findUnique(id: number) {
    const delivery = await this.prismaService.delivery.findUnique({
      where: { id },
      include: { Articles: true, From: true, To: true, Webhook: true },
    });

    return delivery;
  }

  async findMany(ids?: number[]) {
    const deliveries = await this.prismaService.delivery.findMany({
      ...(ids?.length > 0 && { where: { id: { in: ids } } }),
      include: { Articles: true, From: true, To: true, Webhook: true },
    });

    return deliveries;
  }

  async update(id: number, data: Partial<Delivery>) {
    const delivery = await this.prismaService.delivery.update({
      where: { id },
      data,
      include: { Articles: true, From: true, To: true, Webhook: true },
    });

    return delivery;
  }

  async cancel(id: number) {
    const delivery = await this.prismaService.delivery.update({
      where: { id },
      data: { status: 'cancelled' },
      include: { Articles: true, From: true, To: true, Webhook: true },
    });

    return delivery;
  }
}
