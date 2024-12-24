import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalNfConfigRepository } from '@/fiscal-nf-config/domain/repositories/fiscal-nf-config.repository';
import { FiscalNfConfigEntity } from '@/fiscal-nf-config/domain/entities/fiscal-nf-config.entity';
import { FiscalNfConfigModelMapper } from '../models/fiscal-nf-config-model.mapper';
import { PrismaService } from '@/shared/prisma/prisma.service';
import {
  SearchParams,
  SearchResult,
} from '@/shared/domain/repositories/searchable-repository-contracts';

export class FiscalNfConfigPrismaRepository
  implements FiscalNfConfigRepository
{
  sortableFields: string[] = ['serie', 'created_at'];

  constructor(private readonly prismaService: PrismaService) {}
  async findFirst(): Promise<FiscalNfConfigEntity> {
    const model = await this.prismaService.fiscalNfConfig.findFirst();
    if (!model) {
      throw new NotFoundError('FiscalNfConfig not found.');
    }
    return FiscalNfConfigModelMapper.toEntity(model);
  }

  async findByEmitterId(emitterId: number): Promise<FiscalNfConfigEntity> {
    const model = await this.prismaService.fiscalNfConfig.findFirst({
      where: { emitter_id: emitterId },
    });

    if (!model) {
      throw new NotFoundError(
        `No FiscalNfConfig found for emitter ID: ${emitterId}`,
      );
    }

    return FiscalNfConfigModelMapper.toEntity(model);
  }

  async findById(id: string): Promise<FiscalNfConfigEntity> {
    const model = await this.prismaService.fiscalNfConfig.findUnique({
      where: { id },
    });

    if (!model) {
      throw new NotFoundError(`FiscalNfConfig not found with ID: ${id}`);
    }

    return FiscalNfConfigModelMapper.toEntity(model);
  }

  async insert(entity: FiscalNfConfigEntity): Promise<void> {
    await this.prismaService.fiscalNfConfig.create({
      data: FiscalNfConfigModelMapper.toPrisma(entity),
    });
  }

  async update(entity: FiscalNfConfigEntity): Promise<void> {
    await this.prismaService.fiscalNfConfig.update({
      where: { id: entity.id },
      data: FiscalNfConfigModelMapper.toPrisma(entity),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.fiscalNfConfig.delete({
      where: { id },
    });
  }

  async findAll(): Promise<FiscalNfConfigEntity[]> {
    const models = await this.prismaService.fiscalNfConfig.findMany();
    return models.map(FiscalNfConfigModelMapper.toEntity);
  }

  async search(
    params: SearchParams,
  ): Promise<SearchResult<FiscalNfConfigEntity>> {
    const sortable = this.sortableFields.includes(params.sort || '');
    const orderByField = sortable ? params.sort : 'created_at';
    const orderByDir = params.sortDir || 'desc';

    const whereClause: any = {};

    if (params.filter) {
      whereClause.serie = {
        contains: params.filter,
        mode: 'insensitive',
      };
    }

    const total = await this.prismaService.fiscalNfConfig.count({
      where: whereClause,
    });
    const models = await this.prismaService.fiscalNfConfig.findMany({
      where: whereClause,
      orderBy: { [orderByField]: orderByDir },
      skip: params.page > 0 ? (params.page - 1) * params.perPage : 0,
      take: params.perPage,
    });

    const items = models.map(FiscalNfConfigModelMapper.toEntity);

    return new SearchResult({
      items,
      total,
      currentPage: params.page,
      perPage: params.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: params.filter,
    });
  }
}
