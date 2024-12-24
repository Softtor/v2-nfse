import { FiscalProviderEntity } from '@/fiscal-emitter/domain/entities/fiscal-provider.entity';
import { FiscalProviderRepository } from '@/fiscal-emitter/domain/repositories/fiscal-provider.repository';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { FiscalProviderModelMapper } from '../models/fiscal-provider-model.mapper';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export class FiscalProviderPrismaRepository
  implements FiscalProviderRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<FiscalProviderEntity> {
    const model = await this.prismaService.fiscalProvider.findUnique({
      where: { id },
    });

    if (!model) return null;

    return FiscalProviderModelMapper.toEntity(model);
  }

  async findByEmitterId(emitterId: number): Promise<FiscalProviderEntity> {
    const model = await this.prismaService.fiscalProvider.findFirst({
      where: { emitter_id: emitterId },
    });

    if (!model) return null;

    return FiscalProviderModelMapper.toEntity(model);
  }
  async findByIm(im: string): Promise<FiscalProviderEntity> {
    const model = await this.prismaService.fiscalProvider.findFirst({
      where: { municipal_subscription: im },
    });

    if (!model) {
      throw new NotFoundError('Fiscal Provider not found');
    }

    return FiscalProviderModelMapper.toEntity(model);
  }

  async save(entity: FiscalProviderEntity): Promise<void> {
    const prismaData = FiscalProviderModelMapper.toPrisma(entity);
    await this.prismaService.fiscalProvider.create({
      data: prismaData,
    });
  }

  async update(entity: FiscalProviderEntity): Promise<void> {
    const prismaData = FiscalProviderModelMapper.toPrisma(entity);
    await this.prismaService.fiscalProvider.update({
      where: { id: entity.id },
      data: prismaData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.fiscalProvider.delete({
      where: { id },
    });
  }
}
