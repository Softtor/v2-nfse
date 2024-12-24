import { Module } from '@nestjs/common';
import { SendEmailService } from '../aplication/send-email.service';
import { SendEmailController } from './controller/send-email.controller';
import { PrismaModule } from '@/shared/prisma/prisma.module';
import { PdfGeneratorService } from '../aplication/pdf-generator.service';
import { XmlService } from '../aplication/xml-generator.service';
import { StorageProvider } from '@/shared/application/providers/storage.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { FiscalNoteService } from '../aplication/fiscal-note.service';
import { SendEmailListener } from '../domain/events/send-email-listener.events';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [SendEmailController],
  providers: [
    SendEmailService,
    PdfGeneratorService,
    XmlService,
    StorageProvider,
    EnvConfigService,
    FiscalNoteService,
    SendEmailListener,
    {
      provide: StorageProvider,
      useFactory: (envService: EnvConfigService) => {
        const storagePath = envService.getStorage();
        return new StorageProvider(envService, storagePath);
      },
      inject: [EnvConfigService],
    },
  ],
})
export class SendEmailModule {}
