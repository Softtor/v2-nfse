import { NfseResponse } from '@/nfse/domain/interfaces/nfse.interface';
import { FiscalNoteService } from '@/send-email/aplication/fiscal-note.service';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';
import { Injectable } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SendEmailListener {
  constructor(
    private readonly fiscalNoteService: FiscalNoteService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('send-email.fiscal-note')
  async handlerSendEmailFiscalNoteEvent(data: {
    email: string;
    takerName: string;
    rps: NfseResponse;
  }) {
    try {
      await this.fiscalNoteService.generateAndSendEmail(data);
      const pdf = await this.fiscalNoteService.generatePdfToBase64(data.rps);
      const xml = await this.fiscalNoteService.generateXml(data.rps);
      this.eventEmitter.emit('generate-nfse-archives', {
        number: data.rps.ConsultarNfsePorRpsResult.CompNfse.Nfse.InfNfse.Numero,
        pdf,
        xml,
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw new BadRequestError('Erro ao enviar email: ' + error);
    }
  }
}
