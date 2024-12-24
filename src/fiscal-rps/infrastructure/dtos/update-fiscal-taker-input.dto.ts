import { UpdateFiscalTakerInputDto } from '@/fiscal-rps/application/usecases/update-fiscal-taker.usecase';

export class UpdateFiscalTakerDto
  implements Partial<UpdateFiscalTakerInputDto>
{
  id: string;
  document: string;
  name?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  cityCode?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
}
