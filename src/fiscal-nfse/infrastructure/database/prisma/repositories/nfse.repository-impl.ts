import { SearchableNfseRepository } from '@/fiscal-nfse/domain/repositories/searchable-nfse-repository';
import { FiscalNfseEntity } from '@/fiscal-nfse/domain/entities/fiscal-nfse.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { NfseModelMapper } from '../models/nfse-model.mapper';

@Injectable()
export class NfseRepositoryImpl implements SearchableNfseRepository.Repository {
  constructor(private readonly prisma: PrismaService) {}

  async search(
    input: SearchableNfseRepository.SearchInput,
  ): Promise<FiscalNfseEntity[]> {
    const { page, perPage } = input;
    const prismaResult = await this.prisma.fiscalNfse.findMany({
      skip: page * perPage,
      take: perPage,
    });
    return prismaResult.map(NfseModelMapper.toEntity);
  }

  async searchByNumber(number: number): Promise<FiscalNfseEntity> {
    const prismaResult = await this.prisma.fiscalNfse.findUnique({
      where: { number },
    });

    return NfseModelMapper.toEntity(prismaResult);
  }

  async cancelNfse(number: number): Promise<void> {
    await this.prisma.fiscalNfse.delete({
      where: { number },
    });
  }
}
