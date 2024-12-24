import { BatchRpsEntity } from '@/nfse/domain/entities/batch-rps.entity';
import { RpsMapper, WsRps } from './rps.mapper';
import { RpsEntity } from '@/nfse/domain/entities/rps.entity';

export interface WsBatchRps {
  NumeroLote: string;
  QuantidadeRps: string;
  ListaRps: WsRps[];
  Cnpj: string;
  InscricaoMunicipal: string;
}

export interface WsSendBatchRps {
  NumeroLote: string;
  QuantidadeRps: string;
  ListaRps: WsRps[];
  Cnpj: string;
  InscricaoMunicipal: string;
}

export class BatchRpsMapper {
  private entity: BatchRpsEntity;

  constructor(batchRpsEntity: BatchRpsEntity) {
    this.entity = batchRpsEntity;
  }

  toWS(): WsSendBatchRps {
    const {
      batchNumber,
      rpsList,
      provider: { cnpj, municipalSubscription },
    } = this.entity;

    const rpsListWs = rpsList.map((rps) => {
      {
        return new RpsMapper(new RpsEntity(rps)).toWS();
      }
    });

    const xmlObj: WsSendBatchRps = {
      NumeroLote: batchNumber,
      QuantidadeRps: String(rpsListWs.length),
      ListaRps: rpsListWs,
      Cnpj: cnpj,
      InscricaoMunicipal: municipalSubscription,
    };

    return xmlObj;
  }

  static fromWS(wsBatchRps: WsBatchRps): BatchRpsEntity {
    const { NumeroLote, ListaRps, QuantidadeRps } = wsBatchRps;

    const rpsList = ListaRps.map((rps) => {
      {
        return RpsMapper.fromWS(rps).props;
      }
    });

    const batchRpsEntity = new BatchRpsEntity({
      batchNumber: NumeroLote,
      provider: {
        cnpj: wsBatchRps.Cnpj,
        municipalSubscription: wsBatchRps.InscricaoMunicipal,
      },
      rpsList,
    });

    return batchRpsEntity;
  }
}
