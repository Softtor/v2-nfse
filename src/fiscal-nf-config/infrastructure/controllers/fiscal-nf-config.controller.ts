import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateFiscalNfConfigUseCase } from '@/fiscal-nf-config/application/usecases/create-fiscal-nf-config.usecase';
import { UpdateFiscalNfConfigUseCase } from '@/fiscal-nf-config/application/usecases/update-fiscal-nf-config.usecase';
import { CreateFiscalNfConfigDto } from '../dto/create-fiscal-nf-config.dto';
import { UpdateFiscalNfConfigDto } from '../dto/update-fiscal-nf-config.dto';
import { HttpExceptionFilter } from '@/shared/domain/errors/http-exception';
import { GetFiscalNfConfigsByEmitterUseCase } from '@/fiscal-nf-config/application/usecases/get-fiscal-nf-config-byEmitter.usecase';
import { GetFiscalNfConfigsByEmitterIdDto } from '../dto/get-fiscal-nf-config-byEmitter.dto';

@ApiTags('fiscal-nf-configs')
@Controller()
@UseFilters(HttpExceptionFilter)
export class FiscalNfConfigController {
  constructor(
    private readonly getFiscalNfConfigsByEmitterUseCase: GetFiscalNfConfigsByEmitterUseCase,
    private readonly createFiscalNfConfigUseCase: CreateFiscalNfConfigUseCase,
    private readonly updateFiscalNfConfigUseCase: UpdateFiscalNfConfigUseCase,
  ) {}

  @ApiOperation({ summary: 'Get Fiscal NF Configs by Emitter ID' })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal NF Configs have been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('find-by-emitter-id')
  async findByEmitterId(@Payload() params: GetFiscalNfConfigsByEmitterIdDto) {
    try {
      const output = await this.getFiscalNfConfigsByEmitterUseCase.execute(
        params.emitterId,
      );
      return this.toResponse(output);
    } catch (err) {
      return { err: err.message, status: err.status };
    }
  }

  @ApiOperation({ summary: 'Create a new Fiscal NF Config' })
  @ApiBody({ type: CreateFiscalNfConfigDto })
  @ApiResponse({
    status: 201,
    description: 'The Fiscal NF Config has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('create-fiscal-config')
  async create(@Payload() createDto: CreateFiscalNfConfigDto) {
    try {
      const output = await this.createFiscalNfConfigUseCase.execute(createDto);
      return this.toResponse(output);
    } catch (err) {
      return { err: err.message, status: err.status };
    }
  }

  @ApiOperation({ summary: 'Update an existing Fiscal NF Config' })
  @ApiBody({ type: UpdateFiscalNfConfigDto })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal NF Config has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('update-fiscal-config')
  async update(@Payload() updateDto: UpdateFiscalNfConfigDto) {
    try {
      const output = await this.updateFiscalNfConfigUseCase.execute(updateDto);
      return this.toResponse(output);
    } catch (err) {
      console.log(err);
      return { err: err.message, status: err.status };
    }
  }

  private toResponse(entity: any) {
    return {
      id: entity.id,
      serie: entity.serie,
      nextDocumentNumber: entity.nextDocumentNumber,
      simpleNational: entity.simpleNational,
      taxationRegime: entity.taxationRegime,
      emitterId: entity.emitterId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
