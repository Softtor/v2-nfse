export type Certificate = {
  cert: string;
  pkey: string;
};

export interface ICertificateProvider {
  getCertificate(): string;
  saveCertificate(certificate: Buffer): Promise<void>;
  deleteCertificate(): Promise<void>;
  loadCertificate(password: string, filename?: string): Promise<Certificate>;
  readCertificate(): Promise<Buffer>;
}
