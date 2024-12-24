import { FiscalTakerEntity } from '@/fiscal-rps/domain/entities/fiscal-taker.entity';
import { ServiceTakerInterface } from '@/nfse/domain/interfaces/common/service-taker.interface';

export class TakerMapper {
  static toSoapFormat(taker: FiscalTakerEntity): ServiceTakerInterface {
    return {
      IdentificacaoTomador: {
        CpfCnpj: {
          Cpf: taker.document || '',
        },
      },
      RazaoSocial: taker.name || '',
      Endereco: {
        Endereco: taker.address || 'Nao informado',
        Numero: taker.number || 'SN',
        Complemento: taker.complement || '-',
        Bairro: taker.neighborhood || 'Nao informado',
        CodigoMunicipio: taker.cityCode || '',
        Uf: taker.state || '',
        Cep: taker.zipCode || '',
      },
      Contato: {},
    };
  }
}
