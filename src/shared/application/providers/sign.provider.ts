import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { HashAlgorithm, HashAlgorithmType, SignedXml } from 'xml-crypto';
import { Certificate } from '../../domain/providers/certificate.provider';

class Sha1HashAlgorithm implements HashAlgorithm {
  getAlgorithmName(): HashAlgorithmType {
    return 'http://www.w3.org/2000/09/xmldsig#sha1';
  }
  getHash(xml: string): string {
    const hash = createHash('sha1');
    hash.update(xml);
    return hash.digest('base64');
  }
}

@Injectable()
export class SignProvider {
  private _xml: string;
  private signer: SignedXml;
  constructor(certificate: Certificate) {
    this.signer = new SignedXml();
    this.signer.privateKey = certificate.pkey;
    this.signer.publicCert = certificate.cert;
    this.signer.HashAlgorithms['http://www.w3.org/2000/09/xmldsig#sha1'] =
      Sha1HashAlgorithm;
    this.signer.canonicalizationAlgorithm =
      'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';
    this.signer.signatureAlgorithm =
      'http://www.w3.org/2000/09/xmldsig#rsa-sha1';
  }

  public async signXml(xml: string, method: string): Promise<string> {
    this._xml = xml;
    this.signer.addReference({
      xpath: "//*[local-name(.)='" + method + "']",
      transforms: ['http://www.w3.org/2000/09/xmldsig#enveloped-signature'],
      digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1',
    });
    this.signer.computeSignature(xml);
    xml = this.signer.getSignedXml();
    this._xml = this.sanitizeXml(xml);
    return this._xml;
  }

  private sanitizeXml(xml: string): string {
    xml = xml.replace(/ Id="[^"]*"/g, '');
    xml = xml.replace(/ URI="[^"]*"/g, ' URI=""');
    return xml;
  }

  get xml(): string {
    if (!this._xml) {
      throw new Error('XML not signed');
    }
    return this._xml;
  }
}
