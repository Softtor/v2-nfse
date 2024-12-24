import { RpsInterface } from './rps.interface';

export interface BatchInterface {
  NumeroLote: string;
  QuantidadeRps: string;
  ListaRps: RpsInterface[];
  Cnpj: string;
  InscricaoMunicipal: string;
}
