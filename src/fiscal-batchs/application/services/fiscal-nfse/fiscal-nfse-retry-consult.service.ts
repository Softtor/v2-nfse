import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';

interface FailedConsultation {
  consultData: any;
  attempts: number;
  lastAttempt: Date;
}

@Injectable()
export class RetryFailedConsultationService {
  private readonly MAX_ATTEMPTS = 5;
  private failedConsultations: FailedConsultation[] = [];

  constructor(private readonly eventEmitter: EventEmitter2) {}

  addFailedConsultation(consultData: any): void {
    if (!this.isExistingConsultation(consultData)) {
      this.failedConsultations.push({
        consultData,
        attempts: 0,
        lastAttempt: new Date(),
      });
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async retryFailedConsultations(): Promise<void> {
    console.log(
      'Iniciando tentativa de reprocessamento de consultas falhas...',
    );

    const now = new Date();
    for (const failed of [...this.failedConsultations]) {
      if (this.shouldDeferRetry(failed, now)) {
        continue;
      }
      await this.processConsultation(failed, now);
    }

    console.log('Reprocessamento de consultas falhas concluído.');
  }

  private isExistingConsultation(consultData: any): boolean {
    return this.failedConsultations.some(
      (entry) =>
        JSON.stringify(entry.consultData) === JSON.stringify(consultData),
    );
  }

  private shouldDeferRetry(failed: FailedConsultation, now: Date): boolean {
    const timeSinceLastAttempt =
      (now.getTime() - failed.lastAttempt.getTime()) / (1000 * 60 * 60); // horas
    if (failed.attempts >= this.MAX_ATTEMPTS && timeSinceLastAttempt < 24) {
      console.log(
        `Consulta atingiu o limite de tentativas hoje e será reprocessada no próximo dia:`,
        failed.consultData,
      );
      return true;
    }
    return false;
  }

  private async processConsultation(
    failed: FailedConsultation,
    now: Date,
  ): Promise<void> {
    try {
      this.eventEmitter.emit('fiscal-nfse.consult', failed.consultData);
      console.log('Consulta reprocessada com sucesso:', failed.consultData);
      this.removeFailedConsultation(failed.consultData);
    } catch (error) {
      failed.attempts += 1;
      failed.lastAttempt = now;
      console.error(
        `Erro ao reprocessar consulta (tentativa ${failed.attempts}):`,
        failed.consultData,
        error.message,
      );
    }
  }

  private removeFailedConsultation(consultData: any): void {
    this.failedConsultations = this.failedConsultations.filter(
      (entry) =>
        JSON.stringify(entry.consultData) !== JSON.stringify(consultData),
    );
  }
}
