export class LogicHttpError extends Error {
  constructor(public readonly message: string) {
    super(message);
    this.name = 'LogicHttpError';
  }
}
