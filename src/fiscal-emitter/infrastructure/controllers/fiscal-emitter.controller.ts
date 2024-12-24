import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/create-fiscal-emitter.usecase';
import { GetFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/get-fiscal-emitter.usecase';
import { UpdateFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/update-fiscal-emitter.usecase';
import { ListFiscalEmitterUseCase } from '@/fiscal-emitter/application/usecases/list-fiscal-emitter.usecase';
import { HttpExceptionFilter } from '@/shared/domain/errors/http-exception';
import { CreateFiscalEmitterDto } from '../dto/create-fiscal-emitter.dto';
import { UpdateFiscalEmitterDto } from '../dto/update-fiscal-emitter.dto';
import { ListFiscalEmitterDto } from '../dto/list-fiscal-emitter.dto';
import { FiscalEmitterOutputDto } from '@/fiscal-emitter/application/dto/fiscal-emitter-output.dto';
import { SaveCertificateUseCase } from '@/fiscal-emitter/application/usecases/save-certificate.usecase';

@ApiTags('fiscal-emitters')
@Controller()
@UseFilters(HttpExceptionFilter)
export class FiscalEmitterController {
  constructor(
    private readonly createFiscalEmitterUseCase: CreateFiscalEmitterUseCase,
    private readonly getFiscalEmitterUseCase: GetFiscalEmitterUseCase,
    private readonly updateFiscalEmitterUseCase: UpdateFiscalEmitterUseCase,
    private readonly listFiscalEmitterUseCase: ListFiscalEmitterUseCase,
    private readonly saveFileUseCase: SaveCertificateUseCase.UseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new Fiscal Emitter' })
  @ApiBody({ type: CreateFiscalEmitterDto })
  @ApiResponse({
    status: 201,
    description: 'The Fiscal Emitter has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('create-emitter')
  async create(@Payload() createDto: CreateFiscalEmitterDto) {
    try {
      const output = await this.createFiscalEmitterUseCase.execute(createDto);
      return this.toResponse(output);
    } catch (err) {
      return { error: err.message, status: err.status };
    }
  }

  @ApiOperation({ summary: 'Get a Fiscal Emitter by ID' })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal Emitter has been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('find-first-emitter')
  async findOne() {
    try {
      const output = await this.getFiscalEmitterUseCase.execute({ id: 1 });
      return this.toResponse(output);
    } catch (err) {
      return { error: err.message, status: err.status };
    }
  }

  @ApiOperation({ summary: 'Update an existing Fiscal Emitter' })
  @ApiBody({ type: UpdateFiscalEmitterDto })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal Emitter has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('update-first-emitter')
  async update(@Payload() updateDto: UpdateFiscalEmitterDto) {
    try {
      const output = await this.updateFiscalEmitterUseCase.execute({
        ...updateDto,
        id: 1,
      });
      return this.toResponse(output);
    } catch (err) {
      return { error: err.message, status: err.status };
    }
  }

  @ApiOperation({ summary: 'List Fiscal Emitters' })
  @ApiBody({ type: ListFiscalEmitterDto })
  @ApiResponse({
    status: 200,
    description: 'The list of Fiscal Emitters has been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('listFiscalEmitters')
  async list(@Payload() query: ListFiscalEmitterDto) {
    const output = await this.listFiscalEmitterUseCase.execute(query);
    return this.toPaginatedResponse(output);
  }

  // upload-certrificate
  @MessagePattern('upload-certificate')
  async uploadCertificate(
    @Payload() file: { certificate: { buffer: { data: string } } },
  ) {
    try {
      const certificateBuffer = Buffer.from(file.certificate.buffer.data);
      await this.saveFileUseCase.execute({
        certificate: certificateBuffer,
      });
      return { message: 'Certificate uploaded successfully' };
    } catch (err) {
      console.log(err);
      return { error: err.message, status: err.status };
    }
  }

  private toResponse(entity: FiscalEmitterOutputDto) {
    return {
      id: entity.id,
      name: entity.name,
      document: entity.document,
      email: entity.email,
      phone: entity.phone,
      nickname: entity.nickname,
      address: entity.address.address,
      number: entity.address.number,
      complement: entity.address.complement,
      neighborhood: entity.address.neighborhood,
      municipalityCode: entity.address.municipalityCode,
      state: entity.address.state,
      postalCode: entity.address.postalCode,
      city: entity.city,
      crt: entity.crt,
      ie: entity.ie,
      im: entity.im,
      cnaeCode: entity.cnaeCode,
      activityCode: entity.activityCode,
      aliquot: entity.aliquot,
      iss: entity.iss,
      cofins: entity.cofins,
      csll: entity.csll,
      inss: entity.inss,
      ir: entity.ir,
      pis: entity.pis,
      issWithheld: entity.issWithheld,
      serviceItemList: entity.serviceItemList,
      municipalTaxationCode: entity.municipalTaxationCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toPaginatedResponse(output: any) {
    return {
      items: output.items.map(this.toResponse),
      meta: {
        total: output.total,
        currentPage: output.currentPage,
        lastPage: output.lastPage,
        perPage: output.perPage,
      },
    };
  }
}
