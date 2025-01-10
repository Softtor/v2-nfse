import {
  NfsePorLoteResponse,
  NfseResponse,
} from '@/nfse/domain/interfaces/nfse.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SendFiscalNoteDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly takerName: string;

  @ApiProperty()
  readonly subject?: string;

  @ApiProperty()
  readonly rps: NfsePorLoteResponse;
}
