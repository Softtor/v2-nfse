import { Controller, Post, Body, HttpException, Res } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { SendFiscalNoteDto } from '../dto/send-fiscal-note.dto';
import { FiscalNoteService } from '@/send-email/aplication/fiscal-note.service';
import { NfseResponse } from '@/nfse/domain/interfaces/nfse.interface';

@Controller('send-email')
export class SendEmailController {
  constructor(private readonly fiscalNoteService: FiscalNoteService) {}

  @Post('pdf/generate')
  @ApiOperation({ summary: 'Generate a PDF from invoice data' })
  @ApiBody({ description: 'Invoice data to generate the PDF', type: Object })
  @ApiResponse({ status: 200, description: 'PDF generated successfully.' })
  @ApiResponse({ status: 500, description: 'Error generating PDF.' })
  async generatePdf(
    @Body() data: NfseResponse,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const pdfBuffer = await this.fiscalNoteService.generatePdf(data);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="invoice.pdf"',
        'Content-Length': pdfBuffer.length,
      });

      res.send(pdfBuffer);
    } catch (error) {
      throw new HttpException('Error generating PDF: ' + error.message, 500);
    }
  }

  @Post('generate-xml')
  @ApiOperation({ summary: 'Convert invoice data to XML' })
  @ApiBody({ description: 'Invoice data to convert to XML', type: Object })
  @ApiResponse({ status: 200, description: 'XML generated successfully.' })
  @ApiResponse({ status: 500, description: 'Error generating XML.' })
  async generateXml(
    @Body() data: SendFiscalNoteDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const xml = await this.fiscalNoteService.generateXml(data.rps);

      res.set({
        'Content-Type': 'application/xml',
        'Content-Disposition': 'attachment; filename="invoice.xml"',
        'Content-Length': Buffer.byteLength(xml),
      });

      res.send(xml);
    } catch (error) {
      throw new HttpException('Error generating XML: ' + error.message, 500);
    }
  }

  @Post('fiscal-note')
  async generateAndSendEmail(
    @Body() data: SendFiscalNoteDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.fiscalNoteService.generateAndSendEmail(data);

      res.status(200).json({
        message: 'Email enviado com sucesso.',
      });
    } catch (error) {
      throw new HttpException(
        `Error generating PDF, XML, or sending email: ${error.message}`,
        500,
      );
    }
  }
}
