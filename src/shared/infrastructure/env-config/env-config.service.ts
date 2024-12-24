import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('FORWARD_BACKEND_PORT'));
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getJwtSecret(): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    return secret;
  }

  getJwtExpiresInSeconds(): number {
    return Number(this.configService.get<number>('JWT_EXPIRES_IN'));
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getFrontendUrl(): string {
    return this.configService.get<string>('FRONTEND_URL');
  }
  getBackendUrl(): string {
    return this.configService.get<string>('API_PUBLIC_URL');
  }

  getMailHost(): string {
    return this.configService.get<string>('MAIL_HOST');
  }

  getMailPort(): number {
    return Number(this.configService.get<number>('MAIL_PORT'));
  }

  getMailUser(): string {
    return this.configService.get<string>('MAIL_USER');
  }

  getMailPassword(): string {
    return this.configService.get<string>('MAIL_PASSWORD');
  }

  getPagarMeAuthToken(): string {
    const token = this.configService.get<string>('API_KEY');
    return `Basic ${Buffer.from(`${token}:`).toString('base64')}`;
  }

  getPagarMePublicKey(): string {
    return this.configService.get<string>('PUBLIC_KEY');
  }

  getStorage(): string {
    return this.configService.get<string>('STORAGE_PATH') || 'storage';
  }

  getNfseFilesPath(): string {
    return this.getStorage() + '/nfse';
  }

  getNfseCertPass(): string {
    return this.configService.get<string>('NFSE_CERT_PASS');
  }

  getNfseUrl(): string {
    return this.configService.get<string>('NFSE_URL') + '?wsdl';
  }

  getNfseSchemasPath(): string {
    return process.cwd() + '/src/shared/nfse/infrastructure/soap/schemas';
  }

  getNfseBinding(): string {
    return this.configService.get<string>('NFSE_URL');
  }

  getNfseCertPath(): string {
    return this.configService.get<string>('NFSE_CERT_PATH');
  }

  getRabitMqUrl(): string {
    const rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');
    if (!rabbitmqUrl) {
      throw new Error('RabbitMQ URL not found');
    }
    return rabbitmqUrl;
  }
}
