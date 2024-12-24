// eslint-disable-next-line @typescript-eslint/no-require-imports
const soap = require('soap');

async function generateJsonSchema(wsdlUrl, methodName) {
  return new Promise((resolve, reject) => {
    soap.createClient(wsdlUrl, (err, client) => {
      if (err) {
        return reject(`Erro ao criar cliente SOAP: ${err.message}`);
      }

      const description = client.describe();
      const schema = buildJsonSchema(description, methodName);
      resolve(schema || `Método ${methodName} não encontrado.`);
    });
  });
}

function buildJsonSchema(description, methodName) {
  let targetMethod;

  function findMethod(obj, path = []) {
    if (typeof obj !== 'object' || obj === null) {
      return;
    }

    for (const [key, value] of Object.entries(obj)) {
      const newPath = [...path, key];
      if (key === methodName && typeof value === 'object') {
        targetMethod = { path: newPath, schema: value };
        return;
      }
      findMethod(value, newPath);
    }
  }

  findMethod(description);

  if (!targetMethod) {
    return null;
  }

  function traverse(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return;
    }

    const schema = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        schema[key] = traverse(value);
      } else {
        schema[key] = { type: typeof value };
      }
    }
    return schema;
  }

  return {
    methodPath: targetMethod.path.join('.'),
    schema: traverse(targetMethod.schema),
  };
}

// Exemplo de uso
const wsdlUrl =
  'https://isscuritiba.curitiba.pr.gov.br/Iss.NfseWebService/NfseWs.asmx?wsdl'; // Substitua pela URL do WSDL
const methodName = 'RecepcionarLoteRps'; // Nome do método a descrever

// describe wsdl method
// soap.createClient(wsdlUrl, (err, client) => {
//   if (err) {
//     return console.error(`Erro ao criar cliente SOAP: ${err.message}`);
//   }

//   const description = client.describe();
//   console.log('Descrição do WSDL:', JSON.stringify(description, null, 2));
// });

generateJsonSchema(wsdlUrl, methodName)
  .then((schema) => {
    console.log('JSON Schema gerado:', JSON.stringify(schema, null, 2));
  })
  .catch((error) => {
    console.error('Erro:', error);
  });
