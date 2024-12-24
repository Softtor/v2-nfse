import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { FiscalEmitterModelMapper } from '../models/fiscal-emitter-model.mapper';
import { PrismaService } from '@/shared/prisma/prisma.service';
import {
  SearchParams,
  SearchResult,
} from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';

export class FiscalEmitterPrismaRepository implements FiscalEmitterRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(private readonly prismaService: PrismaService) {}

  async findByDocument(document: string): Promise<FiscalEmitterEntity> {
    const model = await this.prismaService.fiscalEmitter.findUnique({
      where: { document },
    });

    if (!model) {
      throw new NotFoundError(
        `Fiscal Emitter not found with document: ${document}`,
      );
    }

    return FiscalEmitterModelMapper.toEntity(model);
  }

  async findAll(): Promise<FiscalEmitterEntity[]> {
    const models = await this.prismaService.fiscalEmitter.findMany();
    return models.map(FiscalEmitterModelMapper.toEntity);
  }

  async findById(id: number): Promise<FiscalEmitterEntity> {
    const model = await this.prismaService.fiscalEmitter.findUnique({
      where: { id },
    });
    if (!model) {
      throw new NotFoundError(`Fiscal Emitter not found with ID: ${id}`);
    }
    return FiscalEmitterModelMapper.toEntity(model);
  }

  async insert(entity: FiscalEmitterEntity): Promise<void> {
    await this.prismaService.fiscalEmitter.create({
      data: FiscalEmitterModelMapper.toPrisma(entity),
    });
    return;
  }

  async save(entity: FiscalEmitterEntity): Promise<FiscalEmitterEntity> {
    const model = await this.prismaService.fiscalEmitter.create({
      data: FiscalEmitterModelMapper.toPrisma(entity),
    });

    return FiscalEmitterModelMapper.toEntity(model);
  }

  async update(entity: FiscalEmitterEntity): Promise<void> {
    console.log(Number(entity.id));
    await this.prismaService.fiscalEmitter.update({
      where: { id: Number(entity.id) },
      data: FiscalEmitterModelMapper.toPrisma(entity),
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.fiscalEmitter.delete({
      where: { id },
    });
  }

  async search(params: SearchParams): Promise<SearchResult> {
    const sortable = this.sortableFields.includes(params.sort || '');
    const orderByField = sortable ? params.sort : 'created_at';
    const orderByDir = params.sortDir || 'desc';

    const whereClause: any = {};

    if (params.filter) {
      whereClause.name = {
        contains: params.filter,
        mode: 'insensitive',
      };
    }

    const total = await this.prismaService.fiscalEmitter.count({
      where: whereClause,
    });
    const models = await this.prismaService.fiscalEmitter.findMany({
      where: whereClause,
      orderBy: { [orderByField]: orderByDir },
      skip: params.page > 0 ? (params.page - 1) * params.perPage : 0,
      take: params.perPage,
    });

    const items = models.map(FiscalEmitterModelMapper.toEntity);

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
