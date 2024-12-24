import { CreateFiscalNfConfigInput } from '@/fiscal-nf-config/application/usecases/create-fiscal-nf-config.usecase';

export class CreateFiscalNfConfigDto
  implements Omit<CreateFiscalNfConfigInput, 'createdAt' | 'updatedAt'>
{
  serie: string;
  nextDocumentNumber: number;
  simpleNational?: boolean;
  taxationRegime: string;
  operationNature?: string;
  culturalIncentive?: boolean;
  fiscalIncentive?: boolean;
  emitterId: number;
}
