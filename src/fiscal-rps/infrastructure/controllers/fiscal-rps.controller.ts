import {
  Controller,
  Body,
  UseFilters,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateFiscalRpsDTO } from '@/fiscal-rps/application/dtos/fiscal-data-input.dto';
import { HttpExceptionFilter } from '@/shared/domain/errors/http-exception';
import { CreateFiscalServiceDto } from '../dtos/create-fiscal-service-input.dto';
import { UpdateFiscalServiceDto } from '../dtos/update-fiscal-service-input.dto';
import { UpdateFiscalTakerDto } from '../dtos/update-fiscal-taker-input.dto';
import { CreateFiscalServiceUseCase } from '@/fiscal-rps/application/usecases/create-fiscal-service.usecase';
import { UpdateFiscalServiceUseCase } from '@/fiscal-rps/application/usecases/update-fiscal-service.usecase';
import { DeleteFiscalServiceUseCase } from '@/fiscal-rps/application/usecases/delete-fiscal-service.usecase';
import { CreateFiscalTakerUseCase } from '@/fiscal-rps/application/usecases/create-fiscal-taker.usecase';
import { UpdateFiscalTakerUseCase } from '@/fiscal-rps/application/usecases/update-fiscal-taker.usecase';
import { DeleteFiscalTakerUseCase } from '@/fiscal-rps/application/usecases/delete-fiscal-taker.usecase';
import { CreateFiscalRpsUseCase } from '@/fiscal-rps/application/usecases/create-fiscal-rps.usecase';

@ApiTags('fiscal-rps')
@Controller()
@UseFilters(HttpExceptionFilter)
export class FiscalRpsController {
  constructor(
    private readonly createFiscalTakerUseCase: CreateFiscalTakerUseCase,
    private readonly updateFiscalTakerUseCase: UpdateFiscalTakerUseCase,
    private readonly deleteFiscalTakerUseCase: DeleteFiscalTakerUseCase,
    private readonly createFiscalServiceUseCase: CreateFiscalServiceUseCase,
    private readonly updateFiscalServiceUseCase: UpdateFiscalServiceUseCase,
    private readonly deleteFiscalServiceUseCase: DeleteFiscalServiceUseCase,
    private readonly createFiscalRpsUseCase: CreateFiscalRpsUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new Fiscal Taker' })
  @ApiBody({ type: CreateFiscalRpsDTO['taker'] })
  @ApiResponse({
    status: 201,
    description: 'The Fiscal Taker has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @MessagePattern('create-taker')
  async createTaker(@Payload() dto: CreateFiscalRpsDTO['taker']): Promise<any> {
    try {
      return await this.createFiscalTakerUseCase.execute(dto);
    } catch (error) {
      return { err: error.message, status: error.status };
    }
  }

  @Put('taker/:id')
  @ApiOperation({ summary: 'Update an existing Fiscal Taker' })
  @ApiBody({ type: UpdateFiscalTakerDto })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal Taker has been successfully updated.',
  })
  @MessagePattern('update-taker')
  async updateTaker(@Body() dto: UpdateFiscalTakerDto) {
    try {
      return await this.updateFiscalTakerUseCase.execute({ ...dto });
    } catch (error) {
      return { err: error.message, status: error.status };
    }
  }

  @Delete('taker/:id')
  @ApiOperation({ summary: 'Delete a Fiscal Taker' })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal Taker has been successfully deleted.',
  })
  async deleteTaker(@Param('id') id: string) {
    try {
      await this.deleteFiscalTakerUseCase.execute(id);
      return { message: `Fiscal Taker with ID ${id} has been deleted.` };
    } catch (error) {
      return { err: error.message, status: error.status };
    }
  }

  @ApiOperation({ summary: 'Create a new Fiscal Service' })
  @MessagePattern('create-service')
  @ApiBody({ type: CreateFiscalServiceDto })
  @ApiResponse({
    status: 201,
    description: 'The Fiscal Service has been successfully created.',
  })
  async createService(@Body() dto: CreateFiscalServiceDto) {
    console.log('CreateFiscalServiceDto', dto);
    try {
      return await this.createFiscalServiceUseCase.execute(dto);
    } catch (error) {
      return { err: error.message, status: error.status };
    }
  }

  @ApiOperation({ summary: 'Update an existing Fiscal Service' })
  @MessagePattern('update-service')
  @ApiBody({ type: UpdateFiscalServiceDto })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal Service has been successfully updated.',
  })
  async updateService(@Body() dto: UpdateFiscalServiceDto) {
    console.log('UpdateFiscalServiceDto', dto);
    try {
      return await this.updateFiscalServiceUseCase.execute(dto);
    } catch (error) {
      return { err: error.message, status: error.status };
    }
  }

  @Delete('service/:id')
  @ApiOperation({ summary: 'Delete a Fiscal Service' })
  @ApiResponse({
    status: 200,
    description: 'The Fiscal Service has been successfully deleted.',
  })
  async deleteService(@Param('id') id: string) {
    try {
      await this.deleteFiscalServiceUseCase.execute(id);
      return { message: `Fiscal Service with ID ${id} has been deleted.` };
    } catch (error) {
      return { err: error.message, status: error.status };
    }
  }

  @ApiOperation({ summary: 'Create a new Fiscal RPS' })
  @MessagePattern('create-rps')
  @ApiResponse({
    status: 201,
    description: 'The Fiscal RPS has been successfully created.',
  })
  async createRps(
    @Body()
    dto: {
      externalPlanCode: string;
      takerDocument: string;
      paymentId: string;
    },
  ) {
    try {
      return await this.createFiscalRpsUseCase.execute(dto);
    } catch (error) {
      return { err: error.message, status: error.status };
    }
  }
}
