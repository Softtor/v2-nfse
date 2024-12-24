import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalBatchNfseRepository } from '@/fiscal-batchs/domain/repositories/fiscal-bach.repository';
import { FiscalBatchNfseEntity } from '@/fiscal-batchs/domain/entities/fiscal-bach.entity';
import { FiscalBatchNfseModelMapper } from '../models/fiscal-batch-model.mapper';
import { PrismaService } from '@/shared/prisma/prisma.service';

export class FiscalBatchNfsePrismaRepository
  implements FiscalBatchNfseRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<FiscalBatchNfseEntity | null> {
    const model = await this.prismaService.fiscalBatchNfse.findUnique({
      where: { id },
    });

    return model ? FiscalBatchNfseModelMapper.toEntity(model) : null;
  }

  async save(entity: FiscalBatchNfseEntity): Promise<FiscalBatchNfseEntity> {
    const createdBatch = await this.prismaService.fiscalBatchNfse.create({
      data: FiscalBatchNfseModelMapper.toCreatePrismaInput(entity),
    });
    return FiscalBatchNfseModelMapper.toEntity(createdBatch);
  }

  async update(entity: FiscalBatchNfseEntity): Promise<void> {
    await this.prismaService.fiscalBatchNfse.update({
      where: { id: entity.id },
      data: FiscalBatchNfseModelMapper.toUpdatePrismaInput(entity),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.fiscalBatchNfse.delete({ where: { id } });
  }

  async findAll(): Promise<FiscalBatchNfseEntity[]> {
    const models = await this.prismaService.fiscalBatchNfse.findMany();
    return models.map(FiscalBatchNfseModelMapper.toEntity);
  }

  async findUnconfirmedBatches(): Promise<FiscalBatchNfseEntity[]> {
    const models = await this.prismaService.fiscalBatchNfse.findMany({
      where: {
        OR: [{ confirmed_send_ws: false }, { confirmed_send_ws: null }],
      },
    });
    return models.map(FiscalBatchNfseModelMapper.toEntity);
  }
}
