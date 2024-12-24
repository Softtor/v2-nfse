import { CreateFiscalServiceInput } from '@/fiscal-rps/application/usecases/create-fiscal-service.usecase';

export class CreateFiscalServiceDto
  implements Omit<CreateFiscalServiceInput, 'createdAt' | 'updatedAt'>
{
  serviceValue: number;
  serviceDescription: string;
  externalPlanCode: string;
}
