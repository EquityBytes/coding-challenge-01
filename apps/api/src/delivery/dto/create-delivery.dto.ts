import { IsOptional, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsOptional()
  @IsString()
  webhook_url?: string;
}
