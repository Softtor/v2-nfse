import { Injectable } from '@nestjs/common';
import { ConsultNfseByRpsInput } from '@/nfse/domain/interfaces/consult-nfse-by-rps-input.interface';
import { CuritibaRepositoryImpl } from '../../infrastructure/repositories/soap/curitiba-repository-impl';

@Injectable()
export class ConsultNfseByRpsUseCase {
  constructor(
    private readonly consultarNfsePorRpsRepository: CuritibaRepositoryImpl.ConsultarNfsePorRps,
  ) {}

  async execute(input: ConsultNfseByRpsInput): Promise<any> {
    const { numero, serie, tipo, cnpj, inscricaoMunicipal } = input;
    return this.consultarNfsePorRpsRepository.consultarNfsePorRps({
      numero,
      serie,
      tipo,
      cnpj,
      inscricaoMunicipal,
    });
  }
}
