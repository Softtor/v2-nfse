import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalTakerRepository } from '@/fiscal-rps/domain/repositories/fiscal-taker.repository';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { FiscalTakerModelMapper } from '../models/fiscal-taker-model.mapper';
import { PrismaService } from '@/shared/prisma/prisma.service';

export class FiscalTakerPrismaRepository implements FiscalTakerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<FiscalTakerEntity> {
    const model = await this.prismaService.fiscalTaker.findUnique({
      where: { id },
    });
    if (!model) throw new NotFoundError(`FiscalTaker not found with ID: ${id}`);
    return FiscalTakerModelMapper.toEntity(model);
  }

  async documentExists(document: string): Promise<boolean> {
    const count = await this.prismaService.fiscalTaker.count({
      where: { document },
    });
    return count > 0;
  }

  async findByDocument(document: string): Promise<FiscalTakerEntity> {
    const model = await this.prismaService.fiscalTaker.findFirst({
      where: { document },
    });
    if (!model)
      throw new NotFoundError(
        `FiscalTaker not found with Document: ${document}`,
      );
    return FiscalTakerModelMapper.toEntity(model);
  }

  async save(entity: FiscalTakerEntity): Promise<void> {
    await this.prismaService.fiscalTaker.create({
      data: FiscalTakerModelMapper.toPrisma(entity),
    });
  }

  async update(entity: FiscalTakerEntity): Promise<void> {
    await this.prismaService.fiscalTaker.update({
      where: { id: entity.id },
      data: FiscalTakerModelMapper.toPrisma(entity),
    });
  }

  async updateByDocument(
    document: string,
    entity: FiscalTakerEntity,
  ): Promise<void> {
    const existingTaker = await this.prismaService.fiscalTaker.findFirst({
      where: { document },
    });
    if (!existingTaker)
      throw new NotFoundError(
        `FiscalTaker not found with Document: ${document}`,
      );
    await this.prismaService.fiscalTaker.update({
      where: { id: existingTaker.id },
      data: FiscalTakerModelMapper.toPrisma(entity),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.fiscalTaker.delete({ where: { id } });
  }
}
