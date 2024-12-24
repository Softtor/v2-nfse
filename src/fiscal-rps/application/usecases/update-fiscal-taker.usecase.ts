import { Injectable, Inject } from '@nestjs/common';
import { FiscalTakerRepository } from '@/fiscal-rps/domain/repositories/fiscal-taker.repository';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

export interface UpdateFiscalTakerInputDto {
  id: string;
  document?: string;
  name?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  cityCode?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
}

@Injectable()
export class UpdateFiscalTakerUseCase {
  constructor(
    @Inject('FiscalTakerPrismaRepository')
    private readonly fiscalTakerRepository: FiscalTakerRepository,
  ) {}

  async execute(dto: UpdateFiscalTakerInputDto): Promise<FiscalTakerEntity> {
    const existingTaker = await this.fiscalTakerRepository.findByDocument(
      dto.document,
    );
    if (!existingTaker) {
      throw new NotFoundError(`Fiscal Taker with ID ${dto.id} not found.`);
    }

    existingTaker.update({
      name: dto.name || existingTaker.name,
      address: dto.address || existingTaker.address,
      number: dto.number || existingTaker.number,
      complement: dto.complement || existingTaker.complement,
      neighborhood: dto.neighborhood || existingTaker.neighborhood,
      cityCode: dto.cityCode || existingTaker.cityCode,
      state: dto.state || existingTaker.state,
      zipCode: dto.zipCode || existingTaker.zipCode,
      phone: dto.phone || existingTaker.phone,
      email: dto.email || existingTaker.email,
      updatedAt: new Date(),
    });

    await this.fiscalTakerRepository.update(existingTaker);
    return existingTaker;
  }
}
