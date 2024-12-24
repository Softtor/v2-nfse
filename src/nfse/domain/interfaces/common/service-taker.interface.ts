import { AddressInterface } from './address.interface';
export interface ServiceTakerInterface {
  IdentificacaoTomador: {
    CpfCnpj: {
      Cnpj?: string;
      Cpf?: string;
    };
  };
  RazaoSocial: string;
  Endereco: AddressInterface;
  Contato?: {
    Telefone?: string;
    Email?: string;
  };
}
