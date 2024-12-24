import { Get, Controller, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class NfseController {
  @Get()
  @MessagePattern('get-nfse-by-id')
  getNfseById(@Param('id') id: string) {
    return { id: id };
  }
}
