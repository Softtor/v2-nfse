export interface MensagemRetorno {
  Codigo: string;
  Mensagem: string;
  Correcao: string;
}

export interface ListaMensagemRetorno {
  MensagemRetorno: [MensagemRetorno];
}

export type ReturnError = {
  ListaMensagemRetorno: ListaMensagemRetorno;
};

export type ReturnReceiveBatchRps = {
  RecepcionarLoteRpsResult?: {
    NumeroLote?: string;
    DataRecebimento?: string;
    Protocolo?: string;
    ListaMensagemRetorno?: ListaMensagemRetorno;
  };
};
