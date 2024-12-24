import { NfseEntity } from '@/nfse/domain/entities/nfse.entity';
import fs from 'fs';

export const generateFiscalNoteTemplate = (data: NfseEntity) => {
  const imagePath = 'public/images/pdv-logo.png';
  const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @import url("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css");
        </style>
      </head>
      <body>
        <main class="w-screen h-screen flex flex-col justify-start items-center mx-auto overflow-x-hidden">
          <section class="w-full h-full">
            <div class="border-2 border-solid border-black grid grid-cols-4 justify-between items-center w-full">
              <div class="col-span-4 flex justify-center items-center w-full p-2 border-b-2 border-solid border-black h-fit">
                <p class="uppercase font-bold text-center text-xl">
                  NFS-e - NOTA FISCAL DE SERVIÇO ELETRÔNICA
                </p>
              </div>

              <div class="col-span-1 flex flex-col justify-center items-start border-b-2 w-full p-2 border-r-2 border-solid border-black h-fit">
                <p class="uppercase font-bold text-center text-xl">${data.number}</p>
              </div>

              <div class="col-span-1 flex flex-col justify-center items-start border-b-2 w-full p-2 border-r-2 border-solid border-black h-fit">
                <p class="uppercase font-bold text-center text-sm">Emitida em:</p>
                <p class="uppercase font-bold text-center text-sm">${data.issueDate}</p>
              </div>

              <div class="col-span-1 flex flex-col justify-center items-start border-b-2 w-full p-2 border-r-2 border-solid border-black h-fit">
                <p class="uppercase font-bold text-center text-sm">Competência:</p>
                <p class="uppercase font-bold text-center text-sm">${data.competence}</p>
              </div>

              <div class="col-span-1 flex flex-col justify-center items-start border-b-2 w-full p-2 border-solid border-black h-fit">
                <p class="uppercase font-bold text-center text-sm">Cód Verificação:</p>
                <p class="uppercase font-bold text-center text-sm">${data.verificationCode}</p>
              </div>

              <!-- Adicionar Imagem -->
              <div class="col-span-1 flex flex-col justify-center items-start w-full h-full border-r-2 border-b-2 border-solid border-black">
                <img src="data:image/png;base64,${imageBase64}" alt="image" class="w-full object-contain" />

              </div>

              <!-- Dados do Prestador de Serviço -->
              <div class="col-span-3 grid grid-cols-2 grid-rows-5 justify-start items-start w-full h-full border-b-2 border-solid border-black p-2">
                <p class="col-span-2 uppercase font-bold text-start text-lg">
                  ${data.serviceProvider.tradeName}
                </p>

                <p class="col-span-1 uppercase font-bold text-start text-lg">
                  ${data.serviceProvider.providerIdentification.cnpj}
                </p>
                <p class="col-span-1 font-bold text-start text-lg">
                  Inscrição Municipal: ${data.serviceProvider.providerIdentification.municipalRegistration}
                </p>

                <p class="col-span-2 text-start text-lg">
                  ${data.serviceProvider.address.street}, ${data.serviceProvider.address.number}, ${data.serviceProvider.address.neighborhood}
                </p>

                <p class="col-span-1 text-start text-lg">${data.serviceProvider.address.state}</p>
                <p class="col-span-1 text-start text-lg">${data.serviceProvider.address.zipCode}</p>

                <p class="col-span-1 font-bold text-start text-lg">
                  Telefone: ${data.serviceRecipient.contact.phone || 'Não informado'}
                </p>
                <p class="col-span-1 text-start text-lg">
                  Email: ${data.serviceRecipient.contact.email || 'Não informado'}
                </p>
              </div>

              <!-- Dados do Tomador de Serviço -->
              <div class="col-span-4 flex justify-start items-center w-full p-2 border-b-2 border-solid border-black h-fit">
                <p class="text-base text-start p-2">Tomador do(s) Serviço(s)</p>
              </div>

              <div class="col-span-4 grid grid-cols-2 grid-rows-5 justify-start items-start w-full h-fit border-solid border-black p-2">
                <p class="col-span-2 uppercase font-bold text-start text-lg">
                  ${data.serviceRecipient.businessName}
                </p>

                <p class="col-span-1 uppercase font-bold text-start text-lg">
                  ${data.serviceRecipient.recipientIdentification.cpfCnpj.cnpj || data.serviceRecipient.recipientIdentification.cpfCnpj.cpf || 'Não informado'}
                </p>
                <p class="col-span-1 font-bold text-start text-lg">
                  Inscrição Municipal: ${data.serviceRecipient.recipientIdentification.cpfCnpj.cnpj || 'Não informado'}
                </p>

                <p class="col-span-2 text-start text-lg">
                  ${data.serviceRecipient.address.zipCode}
                </p>

                <p class="col-span-1 text-start text-lg">${data.serviceRecipient.address.municipalityCode}</p>

                <p class="col-span-1 text-start text-lg">Telefone: ${data.serviceRecipient.contact?.phone || 'Não informado'}</p>
                <p class="col-span-1 text-start text-lg">
                  Email: ${data.serviceRecipient.contact?.email || 'Não informado'}
                </p>
              </div>

              <!-- Descrição do Serviço -->
              <div class="col-span-4 flex justify-start items-center w-full p-2 border-b-2 border-solid border-black h-fit">
                <p class="text-base text-start p-2">Discriminação do(s) Serviço(s)</p>
              </div>

              <div class="col-span-4 flex flex-col justify-start items-start w-full p-2 border-b-2 border-solid border-black">
                <p class="col-span-1 text-start text-lg">${data.services.description}</p>
                <p class="col-span-1 text-start text-lg">
                  Conforme Lei 12.741/2012 o valor aproximado dos tributos é R$ ${data.services.values.otherRetentions} (${data.services.values.rate}%), FONTE: IBPT (24.2.C)
                </p>
              </div>

              <!-- Valores e Taxas -->
              <div class="col-span-4 grid grid-cols-4 grid-rows-6 justify-start items-start w-full h-full border-solid border-black p-2">
                <p class="col-span-1 font-bold text-start text-lg">
                  Valor dos serviços:
                </p>
                <p class="col-span-3 font-bold text-start text-lg">${data.services.values.serviceValue}</p>

                <p class="col-span-1 text-start text-lg">(-) Descontos:</p>
                <p class="col-span-1 text-start text-lg">${data.services.values.conditionalDiscount || 'Não informado'}</p>
                <p class="col-span-1 text-start text-lg">(-) Deduções:</p>
                <p class="col-span-1 text-start text-lg">${data.services.values.deductionValue}</p>

                <p class="col-span-1 text-start text-lg">(-) Retencoes Federais:</p>
                <p class="col-span-1 text-start text-lg">${data.services.values.pisValue}</p>
                <p class="col-span-1 text-start text-lg">
                  (-) Desconto Incondicionado:
                </p>
                <p class="col-span-1 text-start text-lg">${data.services.values.unconditionalDiscount || 'Não informado'}</p>

                <p class="col-span-1 text-start text-lg">
                  (-) ISS Retido na Fonte:
                </p>
                <p class="col-span-1 text-start text-lg">${data.services.values.withheldIssValue}</p>
                <p class="col-span-1 font-bold text-start text-lg">
                  (=) Base de Calculo:
                </p>
                <p class="col-span-1 text-start text-lg">${data.services.values.calculationBase}</p>

                <p class="col-span-1 row-span-2 text-start text-lg">
                  Valor Liquido:
                </p>
                <p class="col-span-1 row-span-2 text-start text-lg">${data.services.values.netNfseValue}</p>
                <p class="col-span-1 font-bold text-start border-b-2 border-black border-solid text-lg">
                  (x) Aliquota:
                </p>
                <p class="col-span-1 text-start border-b-2 border-black border-solid text-lg">
                  ${data.services.values.rate}
                </p>
                <p class="col-span-1 font-bold text-start border-b-2 text-lg">
                  (=) Valor do ISS:
                </p>
                <p class="col-span-1 font-bold text-start border-b-2 text-lg">
                  ${data.services.values.issValue}
                </p>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  `;
};
