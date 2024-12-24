export type Certificate = {
  cert: string;
  pkey: string;
};

export interface LoadCertificateContract {
  getCertificate(): string;
  saveCertificate(certificate: Buffer): Promise<void>;
  deleteCertificate(): Promise<void>;
  loadCertificate(password: string, filename?: string): Promise<Certificate>;
}
