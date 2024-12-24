import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendEmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: EnvConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getMailHost(),
      port: this.configService.getMailPort(),
      secure: true,
      auth: {
        user: this.configService.getMailUser(),
        pass: this.configService.getMailPassword(),
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
    pdfBuffer?: Buffer,
    pdfFilename: string = 'invoice.pdf',
    xmlBuffer?: Buffer,
    xmlFilename: string = 'invoice.xml',
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"White Sistemas" <${this.configService.getMailUser()}>`,
      to,
      subject,
      html,
      attachments: [],
    };

    if (pdfBuffer) {
      mailOptions.attachments.push({
        filename: pdfFilename,
        content: pdfBuffer,
        encoding: 'base64',
      });
    }

    if (xmlBuffer) {
      mailOptions.attachments.push({
        filename: xmlFilename,
        content: xmlBuffer,
        encoding: 'base64',
      });
    }

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso');
    } catch (error) {
      console.log(error);
      await this.sendMail(
        to,
        subject,
        html,
        pdfBuffer,
        pdfFilename,
        xmlBuffer,
        xmlFilename,
      );
    } finally {
      this.transporter.close();
    }
  }
}
