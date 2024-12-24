import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalEmitter() {
  try {
    const fiscalEmitter = await prisma.fiscalEmitter.upsert({
      where: { id: 1 },
      update: {
        name: 'WHITE SISTEMAS E TECNOLOGIA LTDA',
        document: '46.204.900/0001-51',
        email: 'contato@dprassessoria.com.br',
        phone: '41999050767',
        nickname: 'WHITE SISTEMAS E TECNOLOGIA LTDA',
        address: 'Rua Voluntários da Pátria',
        number: '368',
        complement: 'CONJ 505 ANDAR 05 COND ARTHUR HAUER ED',
        neighborhood: 'Centro',
        city: 'Curitiba',
        state: 'PR',
        municipality_code: '4106902',
        postal_code: '80020-010',
        crt: '1',
        im: '010112006414',
        cnae_code: '6209100',
        activity_code: '0107',
        aliquot: 0.0,
        iss: 2.0,
        cofins: 0.0,
        csll: 0.0,
        inss: 0.0,
        ir: 0.0,
        pis: 0.0,
        iss_withheld: 2,
        service_item_list: '107',
        municipal_taxation_code: '0107',
        iss_eligibility: 0,
        updated_at: new Date(),
      },
      create: {
        id: 1,
        name: 'WHITE SISTEMAS E TECNOLOGIA LTDA',
        document: '46.204.900/0001-51',
        email: 'contato@dprassessoria.com.br',
        phone: '41999050767',
        nickname: 'WHITE SISTEMAS E TECNOLOGIA LTDA',
        address: 'Rua Voluntários da Pátria',
        number: '368',
        complement: 'CONJ 505 ANDAR 05 COND ARTHUR HAUER ED',
        neighborhood: 'Centro',
        city: 'Curitiba',
        state: 'PR',
        municipality_code: '4106902',
        postal_code: '80020-010',
        crt: '1',
        im: '010112006414',
        cnae_code: '6209100',
        activity_code: '0107',
        aliquot: 0.0,
        iss: 2.0,
        cofins: 0.0,
        csll: 0.0,
        inss: 0.0,
        ir: 0.0,
        pis: 0.0,
        iss_withheld: 2,
        service_item_list: '107',
        municipal_taxation_code: '0107',
        iss_eligibility: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log('FiscalEmitter seeded:', fiscalEmitter);
  } catch (error) {
    console.error('Error seeding FiscalEmitter:', error);
  } finally {
    await prisma.$disconnect();
  }
}
