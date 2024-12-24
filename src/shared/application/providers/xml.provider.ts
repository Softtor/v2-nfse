import { IXmlProvider } from '@/shared/domain/providers/xml.provider';

export class XmlProvider implements IXmlProvider {
  public removeEmptyFields(xml: string): Buffer {
    xml = xml.replace(/{{.*}}/g, '');
    xml = xml.replace(/<[^>]+><\/[^>]+>/g, '');
    xml = xml.replace(/^\s*[\r\n]/gm, '');
    return Buffer.from(xml);
  }

  public parseParamsToXml<RequiredParams>(
    xml: Buffer,
    params: RequiredParams,
  ): Buffer {
    let result = xml.toString();
    for (const key in params) {
      if (typeof params[key] === 'object') {
        for (const innerKey in params[key]) {
          result = result.replace(
            `{{${innerKey}}}`,
            String(params[key][innerKey]),
          );
        }
        continue;
      }
      result = result.replace(`{{${key}}}`, String(params[key]));
    }
    return Buffer.from(result);
  }
}
