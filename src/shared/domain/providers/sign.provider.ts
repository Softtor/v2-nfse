export interface ISignProvider {
  signXml(xml: string, method: string): Promise<string>;
  readonly xml: string;
}
