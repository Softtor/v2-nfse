import { UpdateFiscalServiceInput } from '@/fiscal-rps/application/usecases/update-fiscal-service.usecase';

export class UpdateFiscalServiceDto
  implements Partial<UpdateFiscalServiceInput>
{
  id: string;
  serviceValue?: number;
  serviceDescription?: string;
  externalPlanCode?: string;
  emitterId?: string;
}
