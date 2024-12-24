import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalRpsRepository } from '@/fiscal-rps/domain/repositories/fiscal-rps.repository';
import { FiscalRpsEntity } from '@/fiscal-rps/domain/entities/fiscal-rps.entity';
import { FiscalRpsModelMapper } from '../models/fiscal-rps-model.mapper';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';

export class FiscalRpsPrismaRepository implements FiscalRpsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<FiscalRpsEntity> {
    const model = await this.prismaService.fiscalRps.findUnique({
      where: { id },
    });
    if (!model) throw new NotFoundError(`FiscalRps not found with ID: ${id}`);
    return FiscalRpsModelMapper.toEntity(model);
  }

  async save(entity: FiscalRpsEntity): Promise<void> {
    await this.prismaService.fiscalRps.create({
      data: FiscalRpsModelMapper.toPrisma(entity),
    });
  }

  async update(entity: FiscalRpsEntity): Promise<void> {
    const updateData = FiscalRpsModelMapper.toPrisma(entity);

    if (!entity.batchId) {
      delete updateData.batch;
    }

    await this.prismaService.fiscalRps.update({
      where: { id: entity.id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.fiscalRps.delete({ where: { id } });
  }

  async findAllByCreated(createdAt: Date): Promise<FiscalRpsEntity[]> {
    const startOfDay = new Date(
      createdAt.getFullYear(),
      createdAt.getMonth(),
      createdAt.getDate(),
    );
    const endOfDay = new Date(
      createdAt.getFullYear(),
      createdAt.getMonth(),
      createdAt.getDate() + 1,
    );

    const models = await this.prismaService.fiscalRps.findMany({
      where: {
        created_at: {
          gte: startOfDay, // Início do dia
          lt: endOfDay, // Fim do dia
        },
        batch_id: null,
      },
    });
    return models.map(FiscalRpsModelMapper.toEntity);
  }

  async findAll(batchId: string): Promise<FiscalRpsEntity[]> {
    if (!batchId) {
      throw new Error('Batch ID is required');
    }
    const models = await this.prismaService.fiscalRps.findMany({
      where: {
        batch_id: batchId,
      },
    });
    return models.map(FiscalRpsModelMapper.toEntity);
  }

  async findByNumber(number: string): Promise<FiscalRpsEntity> {
    const model = await this.prismaService.fiscalRps.findFirst({
      where: { number: parseInt(number) },
    });
    if (!model)
      throw new NotFoundError(`FiscalRps not found with Number: ${number}`);
    return FiscalRpsModelMapper.toEntity(model);
  }
}
