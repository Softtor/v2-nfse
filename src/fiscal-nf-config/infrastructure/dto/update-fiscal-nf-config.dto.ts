import { UpdateFiscalNfConfigInput } from '@/fiscal-nf-config/application/usecases/update-fiscal-nf-config.usecase';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsIn,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFiscalNfConfigDto implements UpdateFiscalNfConfigInput {
  @ApiPropertyOptional({ description: 'ID of the Fiscal NF Config' })
  @IsString()
  id: string;

  @ApiPropertyOptional({ description: 'Series of the Fiscal NF Config' })
  @IsOptional()
  @IsString()
  serie?: string;

  @ApiPropertyOptional({ description: 'Next document number' })
  @IsOptional()
  @IsNumber()
  nextDocumentNumber?: number;

  @ApiPropertyOptional({ description: 'Indicates if it is a simple national' })
  @IsOptional()
  @IsBoolean()
  simpleNational?: boolean;

  @ApiPropertyOptional({ description: 'Taxation regime' })
  @IsOptional()
  @IsString()
  taxationRegime?: string;

  @ApiPropertyOptional({
    description: 'Operation Nature of the Fiscal NF Config',
  })
  @IsOptional()
  @IsString()
  @IsIn(['1', '2'], { message: 'Operation nature must be either 1 or 2.' })
  operationNature?: string;

  @ApiPropertyOptional({
    description: 'Indicates if there is a cultural incentive',
  })
  @IsOptional()
  @IsBoolean()
  culturalIncentive?: boolean;

  @ApiPropertyOptional({
    description: 'Indicates if there is a fiscal incentive',
  })
  @IsOptional()
  @IsBoolean()
  fiscalIncentive?: boolean;
}
