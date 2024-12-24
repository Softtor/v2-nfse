import {
  IsString,
  IsOptional,
  IsNumber,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class AddressDto {
  @ApiProperty({ description: 'Address of the Fiscal Emitter' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Number of the address' })
  @IsString()
  number: string;

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

  @ApiPropertyOptional({ description: 'State of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Postal code of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  postalCode?: string;
}

export class CreateFiscalEmitterDto {
  @ApiProperty({ description: 'Name of the Fiscal Emitter' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Document of the Fiscal Emitter' })
  @IsString()
  document: string;

  @ApiPropertyOptional({ description: 'Email of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Nickname of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ description: 'Address details', type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiPropertyOptional({ description: 'City of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'CRT of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  crt?: string;

  @ApiPropertyOptional({ description: 'IE of the Fiscal Emitter' })
  @IsOptional()
  @IsString()
  ie?: string;

  @ApiProperty({ description: 'IM of the Fiscal Emitter' })
  @IsString()
  im: string;

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

  @ApiPropertyOptional({ description: 'ISS Eligibility' })
  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: 'ISS Eligibility must be either 0 or 1.' })
  issEligibility?: number;

  @ApiPropertyOptional({ description: 'Municipal taxation code' })
  @IsOptional()
  @IsString()
  municipalTaxationCode?: string;
}
