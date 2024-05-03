const exceljs = require("exceljs");

function gerarExcel(dados) {
  return new Promise(async (resolve, reject) => {
    try {
      const headersExcel = retirarHeadersDosDados(dados);
      //  validar se o número de headers é maior que o número de dados

      //  validar se o número de headers é maior que o número de dados
      const workbook = new exceljs.Workbook();

      const sheet = workbook.addWorksheet("Relatório");

      sheet.columns = headersExcel;

      let linhas = dados;
      for (let index = 0; index < linhas.length; index++) {
        sheet.addRow(linhas[index]);
      }
      //   console.log(sheet);
      // Adiciona os dados no excel
      const buffer = await sheet.workbook.xlsx.writeBuffer("relatorio.xlsx");

      resolve(buffer);
    } catch (err) {
      reject(err);
    }
  });
}

function retirarHeadersDosDados(dados) {
  const listaDados = dados;

  console.log(listaDados);
  const headersExcel = [];

  const setHeaderUnicos = new Set();

  // Roda o map em todos os dados
  listaDados.map((dado) => {
    //Pega as chaves do dado e coloca em uma lista => irão ser os cabeçalhos da tabela
    const headersDados = Object.keys(dado);

    //  Roda o map para todos os headers dos dados
    headersDados.map((header) => {
      setHeaderUnicos.has(header)
        ? ""
        : headersExcel.push({ header: header, key: header });

      setHeaderUnicos.add(header);
    });
  });

  return headersExcel;
}

module.exports = gerarExcel;
