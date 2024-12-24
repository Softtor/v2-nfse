import { Controller, Post, Body } from '@nestjs/common';
import { FiscalBatchService } from '@/fiscal-batchs/application/services/fiscal-batch/fiscal-batchs.service';
import { BadRequestError } from '@/shared/domain/errors/bad-request-error';

@Controller('batch-test')
export class BatchTestController {
  constructor(private readonly batchService: FiscalBatchService) {}

  @Post('batch-processing')
  async triggerBatchProcessing() {
    try {
      await this.batchService.handleBatchProcessing();
      return { message: 'Batch processing triggered successfully' };
    } catch (error) {
      throw new BadRequestError(
        `Error triggering batch processing: ${error.message}`,
      );
    }
  }
}
