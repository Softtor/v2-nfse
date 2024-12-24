import { SearchableNfseRepository } from '@/fiscal-nfse/domain/repositories/searchable-nfse-repository';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class GenerateNfseArchivesListener {
  @Inject('SearchableNfseRepository')
  private readonly nfseRepository: SearchableNfseRepository.Repository;

  @OnEvent('generate-nfse-archives')
  async handle(data: { number: string; pdf: string; xml: string }) {
    const nfse = await this.nfseRepository.searchByNumber(Number(data.number));

    if (!nfse) {
      throw new Error('NFSe not found');
    }

    await this.nfseRepository.update(nfse.id, {
      base64Pdf: data.pdf,
      xml: data.xml,
    });
  }
}
