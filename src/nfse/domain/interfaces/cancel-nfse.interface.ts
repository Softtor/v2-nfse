export interface CancelNfseInput {
  pedido: {
    infPedidoCancelamento: {
      identificacaoNfse?: {
        numero: string;
        cnpj: string;
        inscricaoMunicipal: string;
      };
      codigoCancelamento: string;
    };
    signature: {
      id: string;
      signedInfo?: any;
      signatureValue?: any;
      keyInfo?: any;
      object?: any[];
    };
  };
}

export interface CancelNfseOutput {
  CancelarNfseResult: {
    Cancelamento: {
      Nome: string;
      Confirmacao: {
        Nome: string;
        Id: string;
        Pedido: {
          InfPedidoCancelamento: {
            IdentificacaoNfse?: {
              Numero: string;
              Cnpj: string;
              InscricaoMunicipal: string;
            };
            CodigoCancelamento: string;
          };
          Signature: {
            Id: string;
            SignedInfo?: any;
            SignatureValue?: any;
            KeyInfo?: any;
            Object?: any[];
          };
        };
        InfConfirmacaoCancelamento: {
          Nome: string;
          Sucesso: string;
          DataHora: string;
        };
      };
    };
    ListaMensagemRetorno?: {
      MensagemRetorno: {
        Codigo: string;
        Mensagem: string;
        Correcao: string;
      }[];
    };
  };
}
