export type CreateFiscalNfseDTO = {
  number: number;
  verificationCode: string;
  issueDate: Date;
  rpsNumber: string;
  rpsIssueDate: Date;
  competence: Date;
  sentAt?: Date;
};
