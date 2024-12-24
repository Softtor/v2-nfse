import { FiscalEmitterRepository } from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import {
  FiscalEmitterOutputDto,
  FiscalEmitterOutputMapper,
} from '../dto/fiscal-emitter-output.dto';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';
import { FiscalEmitterEntity } from '@/fiscal-emitter/domain/entities/fiscal-emitter.entity';

export type UpdateFiscalEmitterInput = {
  id: number;
  name?: string;
  document?: string;
  email?: string;
  phone?: string;
  nickname?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  state?: string;
  municipalityCode?: string;
  postalCode?: string;
  crt?: string;
  ie?: string;
  im?: string;
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
};

export type UpdateFiscalEmitterOutput = FiscalEmitterOutputDto;

export class UpdateFiscalEmitterUseCase
  implements DefaultUseCase<UpdateFiscalEmitterInput, UpdateFiscalEmitterOutput>
{
  constructor(
    private readonly fiscalEmitterRepository: FiscalEmitterRepository,
  ) {}

  async execute(
    input: UpdateFiscalEmitterInput,
  ): Promise<UpdateFiscalEmitterOutput> {
    const { id, ...updateData } = input;

    const entity = await this.fiscalEmitterRepository.findById(Number(id));
    const updatedProps = this.prepareUpdateData(entity, updateData);

    entity.update(updatedProps);
    await this.fiscalEmitterRepository.update(entity);
    return FiscalEmitterOutputMapper.toOutput(entity);
  }

  private prepareUpdateData(
    entity: FiscalEmitterEntity,
    updateData: Partial<UpdateFiscalEmitterInput>,
  ): Partial<FiscalEmitterEntity['props']> {
    if (this.hasAddressFields(updateData)) {
      const updatedAddress = this.createUpdatedAddress(
        entity.address,
        updateData,
      );
      return { ...updateData, address: updatedAddress };
    }

    return {
      ...updateData,
      address: entity.address,
    };
  }

  private hasAddressFields(
    updateData: Partial<UpdateFiscalEmitterInput>,
  ): boolean {
    const addressFields = [
      'address',
      'number',
      'complement',
      'neighborhood',
      'municipalityCode',
      'state',
      'postalCode',
    ];

    return addressFields.some((field) => field in updateData);
  }

  private createUpdatedAddress(
    currentAddress: AddressEntity,
    updateData: Partial<UpdateFiscalEmitterInput>,
  ): AddressEntity {
    const updatedAddressProps = {
      address: updateData.address ?? currentAddress.address,
      number: updateData.number ?? currentAddress.number,
      complement: updateData.complement ?? currentAddress.complement,
      neighborhood: updateData.neighborhood ?? currentAddress.neighborhood,
      municipalityCode:
        updateData.municipalityCode ?? currentAddress.municipalityCode,
      state: updateData.state ?? currentAddress.state,
      postalCode: updateData.postalCode ?? currentAddress.postalCode,
    };

    return new AddressEntity(updatedAddressProps);
  }
}
