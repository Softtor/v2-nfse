import { Injectable } from '@nestjs/common';
import { ICertificateProvider } from '../../domain/providers/certificate.provider';
import {
  InvalidPasswordError,
  CertError,
} from '../../domain/errors/certificate-error';
import { pki, pkcs12, asn1 } from 'node-forge';
import { IStorageProvider } from '@/shared/domain/providers/storage.provider';

@Injectable()
export class CertificateProvider implements ICertificateProvider {
  constructor(public readonly storage: IStorageProvider) {}

  public getCertificate(): string {
    return this.storage.getFilePath('certificate.pfx');
  }

  public saveCertificate(certificate: Buffer): Promise<void> {
    return this.storage.saveFile('certificate.pfx', certificate);
  }

  public deleteCertificate(): Promise<void> {
    return this.storage.deleteFile('certificate.pfx');
  }

  public async loadCertificate(
    password: string,
    filename?: string,
  ): Promise<{ cert: string; pkey: string }> {
    const pfxBuffer = await this.storage.readFile(
      filename || 'certificate.pfx',
    );
    const pfxAsn1 = asn1.fromDer(pfxBuffer.toString('binary'));

    let pfx: pkcs12.Pkcs12Pfx;
    try {
      pfx = pkcs12.pkcs12FromAsn1(pfxAsn1, password);
    } catch {
      throw new InvalidPasswordError();
    }

    let cert: string | undefined;
    let pkey: string | undefined;

    for (const safeContents of pfx.safeContents) {
      for (const safeBag of safeContents.safeBags) {
        if (safeBag.cert && !cert) {
          // Extract certificate
          cert = pki.certificateToPem(safeBag.cert);
        } else if (safeBag.key && !pkey) {
          // Extract private key
          pkey = pki.privateKeyToPem(safeBag.key);
        }
      }
    }

    if (!cert || !pkey) {
      throw new CertError();
    }
    return { cert: cert.trim(), pkey: pkey.trim() };
  }

  readCertificate(): Promise<Buffer> {
    return this.storage.readFile('certificate.pfx');
  }
}
