export interface IXmlProvider {
  removeEmptyFields(xml: string): Buffer;
  parseParamsToXml<RequiredParams>(xml: Buffer, params: RequiredParams): Buffer;
}
