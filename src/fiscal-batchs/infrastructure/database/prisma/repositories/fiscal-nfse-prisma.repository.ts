import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalNfseRepository } from '@/fiscal-batchs/domain/repositories/fiscal-nfse.repository';
import { FiscalNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-nfse.entity';
import { FiscalNfseModelMapper } from '../models/fiscal-nfse-model.mapper';
import { PrismaService } from '@/shared/prisma/prisma.service';

export class FiscalNfsePrismaRepository implements FiscalNfseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<FiscalNfseEntity | null> {
    const model = await this.prismaService.fiscalNfse.findUnique({
      where: { id },
    });

    return model ? FiscalNfseModelMapper.toEntity(model) : null;
  }

  async save(entity: FiscalNfseEntity): Promise<void> {
    await this.prismaService.fiscalNfse.create({
      data: FiscalNfseModelMapper.toPrisma(entity),
    });
  }

  async update(entity: FiscalNfseEntity): Promise<void> {
    await this.prismaService.fiscalNfse.update({
      where: { id: entity.id },
      data: FiscalNfseModelMapper.toPrisma(entity),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.fiscalNfse.delete({ where: { id } });
  }

  async findByRpsId(rpsId: string): Promise<FiscalNfseEntity | null> {
    const model = await this.prismaService.fiscalNfse.findFirst({
      where: { rps_id: rpsId },
    });

    return model ? FiscalNfseModelMapper.toEntity(model) : null;
  }

  async findByTakerId(takerId: string): Promise<FiscalNfseEntity[]> {
    const models = await this.prismaService.fiscalNfse.findMany({
      where: { taker_id: takerId },
    });

    return models.map(FiscalNfseModelMapper.toEntity);
  }
}
