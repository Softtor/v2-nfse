import { FiscalRpsOutputDto } from '@/fiscal-rps/application/dtos/fiscal-rps-output.dto';

export type FiscalBatchOutputDto = {
  batch: {
    id: string;
    name: string;
    sentAt: Date;
    protocol?: string;
    receiptDate?: string;
    batchNumber?: string;
    confirmedSentWs?: boolean;
  };
  rpsArray: FiscalRpsOutputDto[];
};

export class FiscalBatchOutputMapper {
  static toOutput(
    batch: {
      id: string;
      name: string;
      sentAt: Date;
      protocol?: string;
      receiptDate?: string;
      batchNumber?: string;
      confirmedSentWs?: boolean;
    },
    rpsArray: FiscalRpsOutputDto[],
  ): FiscalBatchOutputDto {
    return {
      batch: {
        id: batch.id,
        name: batch.name,
        sentAt: batch.sentAt,
        protocol: batch.protocol ?? null,
        receiptDate: batch.receiptDate ?? null,
        batchNumber: batch.batchNumber ?? null,
        confirmedSentWs: batch.confirmedSentWs ?? null,
      },
      rpsArray,
    };
  }
}
