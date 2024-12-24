import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalServiceRepository } from '@/fiscal-rps/domain/repositories/fiscal-service.repository';
import { FiscalServiceEntity } from '@/fiscal-rps/domain/entities/fiscal-service.entity';
import { FiscalServiceModelMapper } from '../models/fiscal-service-model.mapper';
import { PrismaService } from '@/shared/prisma/prisma.service';

export class FiscalServicePrismaRepository implements FiscalServiceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<FiscalServiceEntity> {
    const model = await this.prismaService.fiscalService.findUnique({
      where: { id },
    });
    if (!model)
      throw new NotFoundError(`FiscalService not found with ID: ${id}`);
    return FiscalServiceModelMapper.toEntity(model);
  }

  async externalPlanCodeExists(externalPlanCode: string): Promise<boolean> {
    const count = await this.prismaService.fiscalService.count({
      where: { external_plan_code: externalPlanCode },
    });
    return count > 0;
  }

  async findByExternalPlanCode(
    externalPlanCode: string,
  ): Promise<FiscalServiceEntity> {
    const model = await this.prismaService.fiscalService.findFirst({
      where: { external_plan_code: externalPlanCode },
    });
    if (!model)
      throw new NotFoundError(
        `FiscalService not found for External Plan Code: ${externalPlanCode}`,
      );
    return FiscalServiceModelMapper.toEntity(model);
  }

  async save(entity: FiscalServiceEntity): Promise<void> {
    await this.prismaService.fiscalService.create({
      data: FiscalServiceModelMapper.toPrisma(entity),
    });
  }

  async update(entity: FiscalServiceEntity): Promise<void> {
    await this.prismaService.fiscalService.update({
      where: { id: entity.id },
      data: FiscalServiceModelMapper.toPrisma(entity),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.fiscalService.delete({ where: { id } });
  }
}
