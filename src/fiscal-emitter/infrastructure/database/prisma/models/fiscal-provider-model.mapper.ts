import { FiscalProviderEntity } from '@/fiscal-emitter/domain/entities/fiscal-provider.entity';
import { Prisma, FiscalProvider } from '@prisma/client';

export class FiscalProviderModelMapper {
  static toEntity(model: FiscalProvider): FiscalProviderEntity {
    return new FiscalProviderEntity(
      {
        cnpj: model.cnpj,
        cpf: model.cpf ?? undefined,
        municipalSubscription: model.municipal_subscription ?? undefined,
        emitterId: model.emitter_id,
        createdAt: model.created_at,
        updatedAt: model.updated_at,
      },
      model.id,
    );
  }

  static toPrisma(
    entity: FiscalProviderEntity,
  ): Prisma.FiscalProviderCreateInput {
    console.log(entity);
    return {
      id: entity.id,
      cnpj: entity.cnpj,
      cpf: entity.cpf ?? null,
      municipal_subscription: entity.municipalSubscription ?? null,
      emitter: { connect: { id: entity.emitterId } },
      created_at: entity.createdAt ?? new Date(),
      updated_at: entity.updatedAt ?? new Date(),
    };
  }
}
