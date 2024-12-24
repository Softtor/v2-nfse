export interface ConsultNfseInput {
  prestador: {
    cnpj: string;
    inscricaoMunicipal: string;
  };
  numeroNfse: string;
  periodoEmissao: {
    dataInicial: string; // ISO 8601 date format (e.g., "YYYY-MM-DDTHH:mm:ss")
    dataFinal: string; // ISO 8601 date format
  };
  tomador?: {
    cpfCnpj: {
      cpf?: string;
      cnpj?: string;
    };
    inscricaoMunicipal?: string;
  };
  intermediarioServico?: {
    razaoSocial?: string;
    cpfCnpj: {
      cpf?: string;
      cnpj?: string;
    };
    inscricaoMunicipal?: string;
  };
}
