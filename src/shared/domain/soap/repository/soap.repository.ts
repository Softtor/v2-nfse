import { SoapErrorHandler } from '../../errors/soap-errors';
import { Client } from 'soap';

export abstract class SoapAbstractRepository {
  private errorHandler: SoapErrorHandler;

  constructor(protected readonly soapClient: Client) {
    this.errorHandler = new SoapErrorHandler();
  }

  public async execute<Result, Params = any>(
    method: string,
    params: Params,
  ): Promise<Result> {
    return new Promise((resolve, reject) => {
      this.soapClient[method](params, (err: any, result: Result) => {
        if (err) {
          console.error(err, this.soapClient);
          reject(this.errorHandler.handleError(err));
        }
        resolve(result);
      });
    });
  }
}
