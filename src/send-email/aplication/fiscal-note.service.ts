import { Injectable, HttpException } from '@nestjs/common';
import { PdfGeneratorService } from '@/send-email/aplication/pdf-generator.service';
import { XmlService } from '@/send-email/aplication/xml-generator.service';
import { SendEmailService } from '@/send-email/aplication/send-email.service';
import { NfsePorLoteResponse } from '@/nfse/domain/interfaces/nfse.interface';
import { greetingsTemplate } from '@/send-email/aplication/helper/greetings-template';
import { generateFiscalNoteTemplate } from '@/send-email/aplication/helper/fiscal-note-template';
import { StorageProvider } from '@/shared/application/providers/storage.provider';
import * as fs from 'fs';
import * as path from 'path';
import { NfseLoteMapper } from '@/nfse/infrastructure/repositories/soap/mappers/nfse-lote.mapper';

@Injectable()
export class FiscalNoteService {
  constructor(
    private readonly pdfGeneratorService: PdfGeneratorService,
    private readonly xmlService: XmlService,
    private readonly sendEmailService: SendEmailService,
    private readonly storageProvider: StorageProvider,
  ) {}

  async generatePdf(data: NfsePorLoteResponse): Promise<Buffer> {
    try {
      const nfseEntity = NfseLoteMapper.fromWS(data);
      const html = generateFiscalNoteTemplate(nfseEntity);
      return await this.pdfGeneratorService.generatePdfFromHtml(html);
    } catch (error) {
      throw new HttpException(`Error generating PDF: ${error.message}`, 500);
    }
  }

  async generatePdfToBase64(data: NfsePorLoteResponse): Promise<string> {
    try {
      const pdfBuffer = await this.generatePdf(data);
      return pdfBuffer.toString('base64');
    } catch (error) {
      throw new HttpException(`Error generating PDF: ${error.message}`, 500);
    }
  }

  async generateXml(data: NfsePorLoteResponse): Promise<string> {
    try {
      const nfseEntity = NfseLoteMapper.fromWS(data);
      return this.xmlService.convertToXml(nfseEntity);
    } catch (error) {
      throw new HttpException(`Error generating XML: ${error.message}`, 500);
    }
  }

  async generateAndSendEmail(data: {
    email: string;
    subject?: string;
    takerName: string;
    rps: NfsePorLoteResponse;
  }): Promise<void> {
    try {
      const nfseEntity = NfseLoteMapper.fromWS(data.rps);
      const emailBody = greetingsTemplate(data.takerName);

      const pdfFilePath = `nota_fiscal_${nfseEntity.number}.pdf`;
      const xmlFilePath = `nota_fiscal_${nfseEntity.number}.xml`;

      const pdfFileExists = await this.checkIfFileExists(pdfFilePath);
      const xmlFileExists = await this.checkIfFileExists(xmlFilePath);

      let pdfBuffer: Buffer;
      let xmlBuffer: Buffer;

      if (pdfFileExists && xmlFileExists) {
        pdfBuffer = await this.readFile(pdfFilePath);
        xmlBuffer = await this.readFile(xmlFilePath);
      } else {
        pdfBuffer = await this.generatePdf(data.rps);
        xmlBuffer = Buffer.from(await this.generateXml(data.rps), 'utf-8');

        await this.storageProvider.saveFile(pdfFilePath, pdfBuffer);
        await this.storageProvider.saveFile(xmlFilePath, xmlBuffer);
      }
      await this.sendEmailService.sendMail(
        data.email,
        data.subject ? data.subject : 'Envio de Nota Fiscal - White Sistemas',
        emailBody,
        pdfBuffer,
        pdfFilePath,
        xmlBuffer,
        xmlFilePath,
      );
    } catch (error) {
      throw new HttpException(
        `Error generating PDF, XML, or sending email: ${error.message}`,
        500,
      );
    }
  }

  private async checkIfFileExists(filePath: string): Promise<boolean> {
    try {
      const fullPath = path.join(this.storageProvider.storage, filePath);
      await fs.promises.access(fullPath, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async readFile(filePath: string): Promise<Buffer> {
    try {
      const fullPath = path.join(this.storageProvider.storage, filePath);
      const fileBuffer = await fs.promises.readFile(fullPath);
      return fileBuffer;
    } catch (error) {
      throw new HttpException(`Error reading file: ${filePath}`, 500);
    }
  }
}
