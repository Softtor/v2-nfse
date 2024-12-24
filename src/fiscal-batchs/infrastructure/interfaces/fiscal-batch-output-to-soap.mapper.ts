import { BatchInterface } from '@/nfse/domain/interfaces/common/batch.interface';
import { FiscalBatchOutputDto } from '@/fiscal-batchs/application/dtos/fiscal-bach-output.dto';
import { RpsMapper } from '@/fiscal-rps/infrastructure/interfaces/fiscal-rps-soap.mapper';

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
