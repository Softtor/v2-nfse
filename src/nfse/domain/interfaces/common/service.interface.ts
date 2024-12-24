export interface ServiceInterface {
  Valores: {
    ValorServicos: number;
    ValorDeducoes: number;
    ValorPis: number;
    DescontoIncondicionado: number;
    DescontoCondicionado: number;
    ValorCofins?: number;
    ValorInss?: number;
    ValorIr?: number;
    ValorCsll?: number;
    OutrasRetencoes?: number;
    ValTotTributos?: number;
    ValorIss?: number;
    Aliquota?: number;
    IssRetido: 1 | 2;
  };
  ItemListaServico: string;
  CodigoCnae: string;
  CodigoTributacaoMunicipio: string;
  Discriminacao: string;
  CodigoMunicipio: string;
  ExigibilidadeISS: number;
  MunicipioIncidencia: string;
  CodigoNbs?: string;
}
