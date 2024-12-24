import { SoapRequestError } from '@/shared/domain/errors/soap-errors';

export function handleError(error: {
  ListaMensagemRetorno?: {
    MensagemRetorno?: [
      {
        Mensagem?: string;
        Codigo?: string;
        Correcao?: string;
      },
    ];
  };
}): void {
  if (error.ListaMensagemRetorno) {
    const errors = error.ListaMensagemRetorno.MensagemRetorno.map((message) => {
      return (
        'Mensagem: ' +
        message.Mensagem +
        '\n Código: ' +
        message.Codigo +
        '\n Correção: ' +
        message.Correcao
      );
    });
    const errorsString = errors.join('\n');
    throw new SoapRequestError(errorsString);
  }
}
