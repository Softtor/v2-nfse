import { UpdateFiscalEmitterInput } from '@/fiscal-emitter/application/usecases/update-fiscal-emitter.usecase';
import { IsOptional, IsString, IsNumber, IsEmail, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFiscalEmitterDto implements UpdateFiscalEmitterInput {
  @ApiPropertyOptional({ description: 'ID of the Fiscal Emitter' })
  @IsString()
  id: number;

  @ApiPropertyOptional({ description: 'Name of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Document of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({ description: 'Email of the Fiscal Emitter' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Nickname of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiPropertyOptional({ description: 'Address of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Number of the address' })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional({ description: 'Complement of the address' })
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiPropertyOptional({ description: 'Neighborhood of the address' })
  @IsOptional()
  @IsString()
  neighborhood?: string;

  @ApiPropertyOptional({ description: 'Municipality code' })
  @IsOptional()
  @IsString()
  municipalityCode?: string;

  @ApiPropertyOptional({ description: 'City of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'State of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Postal code of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'CRT of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  crt?: string;

  @ApiPropertyOptional({ description: 'IE of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  ie?: string;

  @ApiPropertyOptional({ description: 'IM of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  im?: string;

  @ApiPropertyOptional({ description: 'CNAE code' })
  @IsOptional()
  @IsString()
  cnaeCode?: string;

  @ApiPropertyOptional({ description: 'Activity code' })
  @IsOptional()
  @IsString()
  activityCode?: string;

  @ApiPropertyOptional({ description: 'Aliquot' })
  @IsOptional()
  @IsNumber()
  aliquot?: number;

  @ApiPropertyOptional({ description: 'ISS' })
  @IsOptional()
  @IsNumber()
  iss?: number;

  @ApiPropertyOptional({ description: 'COFINS' })
  @IsOptional()
  @IsNumber()
  cofins?: number;

  @ApiPropertyOptional({ description: 'CSLL' })
  @IsOptional()
  @IsNumber()
  csll?: number;

  @ApiPropertyOptional({ description: 'INSS' })
  @IsOptional()
  @IsNumber()
  inss?: number;

  @ApiPropertyOptional({ description: 'IR' })
  @IsOptional()
  @IsNumber()
  ir?: number;

  @ApiPropertyOptional({ description: 'PIS' })
  @IsOptional()
  @IsNumber()
  pis?: number;

  @ApiPropertyOptional({ description: 'ISS Withheld' })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2], { message: 'ISS Withheld must be either 1 or 2.' })
  issWithheld?: number;

  @ApiPropertyOptional({ description: 'Service item list' })
  @IsOptional()
  @IsString()
  serviceItemList?: string;

  @ApiPropertyOptional({ description: 'Municipal taxation code' })
  @IsOptional()
  @IsString()
  municipalTaxationCode?: string;

  @ApiPropertyOptional({ description: 'ISS Eligibility' })
  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: 'ISS Eligibility must be either 0 or 1.' })
  issEligibility?: number;
}
