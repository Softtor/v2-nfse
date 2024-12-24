export class InvalidPasswordError extends Error {
  constructor() {
    super('invalid certificate password');
    this.name = 'InvalidPasswordError';
  }
}

export class CertError extends Error {
  constructor() {
    super('invalid certificate');
    this.name = 'CertError';
  }
}
