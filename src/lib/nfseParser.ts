export interface NfseData {
  numeroNota: string;
  competencia: string;
  dataEmissao: string;
  prestador: string;
  tomador: string;
  valorBruto: string;
  valorLiquido: string;
  baseCalculo: string;
  issqn: string;
  retencoes: string;
  nbs: string;
  municipioIncidencia: string;
  ibs: string;
  cbs: string;
}

export function parseNfseXml(xmlString: string): NfseData | null {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const getVal = (tags: string[]): string => {
      for (const tag of tags) {
        const elements = xmlDoc.getElementsByTagName(tag);
        if (elements.length > 0 && elements[0].textContent) {
          return elements[0].textContent.trim();
        }
        const allElements = xmlDoc.getElementsByTagName("*");
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i];
          if (el.localName === tag && el.textContent) {
            return el.textContent.trim();
          }
        }
      }
      return "";
    };

    const numeroNota = getVal(["Numero", "nNFSe", "NumeroNfse", "nNF"]);
    const competencia = getVal(["Competencia", "cComp", "CompetenciaNfse"]);
    const dataEmissao = getVal(["DataEmissao", "dEmi", "DataEmissaoNfse", "dhEmi"]);
    
    let prestador = "";
    const prestadorNode = xmlDoc.getElementsByTagName("Prestador")[0] || xmlDoc.getElementsByTagName("prestador")[0] || xmlDoc.getElementsByTagName("emit")[0];
    if (prestadorNode) {
       const razao = prestadorNode.getElementsByTagName("RazaoSocial")[0]?.textContent || prestadorNode.getElementsByTagName("xNome")[0]?.textContent || "";
       const cnpj = prestadorNode.getElementsByTagName("Cnpj")[0]?.textContent || prestadorNode.getElementsByTagName("CNPJ")[0]?.textContent || "";
       prestador = `${cnpj} ${razao}`.trim();
    }
    if(!prestador) prestador = getVal(["xNomePrestador", "RazaoSocialPrestador"]);

    let tomador = "";
    const tomadorNode = xmlDoc.getElementsByTagName("Tomador")[0] || xmlDoc.getElementsByTagName("tomador")[0] || xmlDoc.getElementsByTagName("dest")[0];
    if (tomadorNode) {
       const razao = tomadorNode.getElementsByTagName("RazaoSocial")[0]?.textContent || tomadorNode.getElementsByTagName("xNome")[0]?.textContent || "";
       const cnpj = tomadorNode.getElementsByTagName("Cnpj")[0]?.textContent || tomadorNode.getElementsByTagName("CNPJ")[0]?.textContent || tomadorNode.getElementsByTagName("Cpf")[0]?.textContent || tomadorNode.getElementsByTagName("CPF")[0]?.textContent || "";
       tomador = `${cnpj} ${razao}`.trim();
    }
    if(!tomador) tomador = getVal(["xNomeTomador", "RazaoSocialTomador"]);

    const valorBruto = getVal(["ValorServicos", "vServ"]);
    const valorLiquido = getVal(["ValorLiquidoNfse", "vLiq"]);
    const baseCalculo = getVal(["BaseCalculo", "vBC"]);
    const issqn = getVal(["ValorIss", "vISSQN", "vISS"]);
    
    const pis = parseFloat(getVal(["ValorPis", "vPIS"]) || "0");
    const cofins = parseFloat(getVal(["ValorCofins", "vCOFINS"]) || "0");
    const inss = parseFloat(getVal(["ValorInss", "vINSS"]) || "0");
    const ir = parseFloat(getVal(["ValorIr", "vIR"]) || "0");
    const csll = parseFloat(getVal(["ValorCsll", "vCSLL"]) || "0");
    const totalRetencoes = pis + cofins + inss + ir + csll;
    const retencoes = totalRetencoes > 0 ? totalRetencoes.toFixed(2) : "";

    const nbs = getVal(["ItemListaServico", "cServ", "NBS", "CodigoTributacaoNacional"]);
    const municipioIncidencia = getVal(["CodigoMunicipio", "cMun", "CodigoMunicipioIncidencia"]);
    
    const ibs = getVal(["vIBS", "ValorIbs"]);
    const cbs = getVal(["vCBS", "ValorCbs"]);

    return {
      numeroNota,
      competencia,
      dataEmissao,
      prestador,
      tomador,
      valorBruto,
      valorLiquido,
      baseCalculo,
      issqn,
      retencoes: retencoes ? retencoes.replace('.', ',') : retencoes,
      nbs,
      municipioIncidencia,
      ibs,
      cbs
    };
  } catch (error) {
    console.error("Erro ao fazer o parse do XML:", error);
    return null;
  }
}
