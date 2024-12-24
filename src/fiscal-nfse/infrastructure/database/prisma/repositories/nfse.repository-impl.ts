import { SearchableNfseRepository } from '@/fiscal-nfse/domain/repositories/searchable-nfse-repository';
import { FiscalNfseEntity } from '@/fiscal-nfse/domain/entities/fiscal-nfse.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { NfseModelMapper } from '../models/nfse-model.mapper';
import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { FiscalTakerModelMapper } from '@/fiscal-rps/infrastructure/database/prisma/models/fiscal-taker-model.mapper';

@Injectable()
export class NfseRepositoryImpl implements SearchableNfseRepository.Repository {
  constructor(private readonly prisma: PrismaService) {}

  async searchWithTaker(
    input: SearchableNfseRepository.SearchInput,
  ): Promise<{ nfse: FiscalNfseEntity; taker: FiscalTakerEntity }[]> {
    const page = input.page || 1;
    const limit = input.limit || 10;
    const skip = (page - 1) * limit;

    const result = await this.prisma.fiscalNfse.findMany({
      skip,
      take: limit,
      include: {
        taker: true,
      },
    });
    console.log(result, input);
    return result.map((item) => ({
      nfse: NfseModelMapper.toEntity(item),
      taker: FiscalTakerModelMapper.toEntity(item.taker),
    }));
  }

  async update(id: string, data: Partial<FiscalNfseEntity>): Promise<void> {
    try {
      const nfse = await this.prisma.fiscalNfse.findUnique({ where: { id } });
      await this.prisma.fiscalNfse.update({
        where: { id },
        data: {
          ...nfse,
          ...data,
        },
      });
    } catch (err) {
      throw new Error('Error updating NFSe' + err);
    }
  }

  async search(
    input: SearchableNfseRepository.SearchInput,
  ): Promise<FiscalNfseEntity[]> {
    const page = input.page || 1;
    const limit = input.limit || 10;
    const skip = (page - 1) * limit;
    const prismaResult = await this.prisma.fiscalNfse.findMany({
      skip,
      take: limit,
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
