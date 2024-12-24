import { ServiceTakerEntity } from '@/nfse/domain/entities/service-taker.entity';
import { AddressMapper, WsAddress } from './address.mapper';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';

export interface WsServiceTaker {
  IdentificacaoTomador: {
    CpfCnpj: {
      Cnpj?: string;
      Cpf?: string;
    };
  };
  RazaoSocial: string;
  Endereco: WsAddress;
  Contato?: {
    Telefone?: string;
    Email?: string;
  };
}

export class ServiceTakerMapper {
  private entity: ServiceTakerEntity;

  constructor(serviceTakerEntity: ServiceTakerEntity) {
    this.entity = serviceTakerEntity;
  }

  toWS(): WsServiceTaker {
    const { cnpj, cpf, businessName, address, phone, email } = this.entity;

    const identificacaoTomador = {
      IdentificacaoTomador: {
        CpfCnpj: {
          ...(cnpj ? { Cnpj: cnpj } : {}),
          ...(cpf ? { Cpf: cpf } : {}),
        },
      },
    };

    const razaoSocialNode = {
      RazaoSocial: businessName,
    };

    if (!address) {
      throw new Error('Address is required');
    }
    const enderecoNode = new AddressMapper(new AddressEntity(address));

    const contatoNode: any = {};
    if (phone || email) {
      contatoNode.Contato = {};
      if (phone) {
        contatoNode.Contato.Telefone = phone;
      }
      if (email) {
        contatoNode.Contato.Email = email;
      }
    }

    const tomadorServico = {
      ...identificacaoTomador,
      ...razaoSocialNode,
      ...enderecoNode.toWS(),
      ...contatoNode,
    };

    return tomadorServico;
  }

  static fromWS(wsServiceTaker: WsServiceTaker): ServiceTakerEntity {
    const { IdentificacaoTomador, RazaoSocial, Endereco, Contato } =
      wsServiceTaker;
    const { CpfCnpj } = IdentificacaoTomador;
    const { Cnpj, Cpf } = CpfCnpj;

    const addressEntity = AddressMapper.fromWS(Endereco);

    const serviceTakerEntity = new ServiceTakerEntity({
      cnpj: Cnpj,
      cpf: Cpf,
      businessName: RazaoSocial,
      address: addressEntity.props,
      phone: Contato?.Telefone,
      email: Contato?.Email,
    });

    return serviceTakerEntity;
  }
}
