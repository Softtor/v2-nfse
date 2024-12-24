import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';
import { FiscalProviderRepository } from '@/fiscal-emitter/domain/repositories/fiscal-provider.repository';
import { FiscalProviderEntity } from '@/fiscal-emitter/domain/entities/fiscal-provider.entity';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { ConflictError } from '@/shared/domain/errors/conflict-error';
import {
  FiscalEmitterOutputDto,
  FiscalEmitterOutputMapper,
} from '../dto/fiscal-emitter-output.dto';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';

export interface AddressInput {
  address: string;
  number: string;
  complement?: string;
  neighborhood?: string;
  state?: string;
  municipalityCode?: string;
  postalCode?: string;
}

export interface CreateFiscalEmitterInput {
  name: string;
  document: string;
  email?: string;
  phone?: string;
  nickname?: string;
  address: AddressInput;
  city?: string;
  crt?: string;
  ie?: string;
  im: string;
  cnaeCode?: string;
  activityCode?: string;
  aliquot?: number;
  iss?: number;
  cofins?: number;
  csll?: number;
  inss?: number;
  ir?: number;
  pis?: number;
  issWithheld?: number;
  serviceItemList?: string;
  issEligibility?: number;
  municipalTaxationCode?: string;
}
export type CreateFiscalEmitterOutput = FiscalEmitterOutputDto;

export class CreateFiscalEmitterUseCase
  implements DefaultUseCase<CreateFiscalEmitterInput, CreateFiscalEmitterOutput>
{
  constructor(
    private readonly fiscalEmitterRepository: FiscalEmitterRepository,
    private readonly fiscalProviderRepository: FiscalProviderRepository,
  ) {}

  async execute(
    input: CreateFiscalEmitterInput,
  ): Promise<CreateFiscalEmitterOutput> {
    const addressEntity = this.createAddressEntity(input);
    const emitterEntity = this.createEmitterEntity(input, addressEntity);
    const providerEntity = this.createProviderEntity(
      input,
      Number(emitterEntity.id),
    );

    try {
      await this.persistEntities(emitterEntity, providerEntity);
    } catch (error) {
      if (error instanceof ConflictError) {
        throw new ConflictError(
          'A fiscal emitter or provider with this document already exists.',
        );
      }
      throw error;
    }

    return this.mapToOutput(emitterEntity);
  }

  private createAddressEntity(input: CreateFiscalEmitterInput): AddressEntity {
    const { address } = input;
    const entity = new AddressEntity({
      address: address.address,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      municipalityCode: address.municipalityCode || '',
      state: address.state || '',
      postalCode: address.postalCode || '',
    });
    console.log('address ---->', entity);
    return entity;
  }

  private createEmitterEntity(
    input: CreateFiscalEmitterInput,
    addressEntity: AddressEntity,
  ): FiscalEmitterEntity {
    const {
      name,
      document,
      email,
      phone,
      nickname,
      crt,
      city,
      ie,
      im,
      cnaeCode,
      activityCode,
      aliquot,
      iss,
      cofins,
      csll,
      inss,
      ir,
      pis,
      issWithheld,
      serviceItemList,
      municipalTaxationCode,
      issEligibility,
    } = input;
    const entity = new FiscalEmitterEntity({
      name,
      document,
      email,
      phone,
      nickname,
      address: addressEntity,
      city,
      crt,
      ie,
      im,
      cnaeCode,
      activityCode,
      aliquot,
      iss,
      cofins,
      csll,
      inss,
      ir,
      pis,
      issWithheld,
      serviceItemList,
      municipalTaxationCode,
      issEligibility,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('emitter ---->', entity);
    return entity;
  }

  private createProviderEntity(
    input: CreateFiscalEmitterInput,
    emitterId: number,
  ): FiscalProviderEntity {
    return new FiscalProviderEntity({
      cnpj: input.document,
      municipalSubscription: input.im,
      emitterId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private async persistEntities(
    emitter: FiscalEmitterEntity,
    provider: FiscalProviderEntity,
  ): Promise<void> {
    emitter = await this.fiscalEmitterRepository.save(emitter);
    provider.emitterId = Number(emitter.id);
    await this.fiscalProviderRepository.save(provider);
  }

  private mapToOutput(entity: FiscalEmitterEntity): FiscalEmitterOutputDto {
    return FiscalEmitterOutputMapper.toOutput(entity);
  }
}
