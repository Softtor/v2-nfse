import { BatchInterface } from '@/nfse/domain/interfaces/common/batch.interface';

export class BatchMapper {
  static toSoapFormat(
    batchNumber: string,
    listaRps: any[],
    providerSoap: any,
  ): BatchInterface {
    return {
      NumeroLote: batchNumber,
      QuantidadeRps: listaRps.length.toString(),
      ListaRps: listaRps,
      Cnpj: providerSoap.Cnpj,
      InscricaoMunicipal: providerSoap.InscricaoMunicipal,
    };
  }
}
