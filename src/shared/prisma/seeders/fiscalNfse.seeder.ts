import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalNfse() {
  try {
    const fiscalNfse = await prisma.fiscalNfse.upsert({
      where: { id: '2999915a-e9a2-4ea2-8e1b-db578b1029f9' },
      update: {
        number: 15,
        verification_code: '123456789',
        issue_date: new Date('2024-12-24T12:31:10.921Z'),
        rps_number: '1',
        rps_issue_date: new Date('2024-12-24T12:31:10.921Z'),
        competence: new Date('2024-12-24T00:00:00.000Z'),
        provider_id: '8bd07093-7231-4f12-96fe-f450f409bf0d',
        taker_id: 'a47a972c-c1eb-11ef-8783-0242ac120002',
        rps_id: '2999915a-e9a2-4ea2-8e1b-db578b1029f9',
        sent_at: new Date('2024-12-24T12:31:10.921Z'),
        xml: '<xml>Sample Content</xml>',
        base64Pdf: 'SampleBase64EncodedPdfContent',
      },
      create: {
        id: '2999915a-e9a2-4ea2-8e1b-db578b1029f9',
        number: 15,
        verification_code: '123456789',
        issue_date: new Date('2024-12-24T12:31:10.921Z'),
        rps_number: '1',
        rps_issue_date: new Date('2024-12-24T12:31:10.921Z'),
        competence: new Date('2024-12-24T00:00:00.000Z'),
        provider_id: '8bd07093-7231-4f12-96fe-f450f409bf0d',
        taker_id: 'a47a972c-c1eb-11ef-8783-0242ac120002',
        rps_id: '2999915a-e9a2-4ea2-8e1b-db578b1029f9',
        sent_at: new Date('2024-12-24T12:31:10.921Z'),
        xml: '<xml>Sample Content</xml>',
        base64Pdf: 'SampleBase64EncodedPdfContent',
      },
    });

    console.log('FiscalNfse seeded:', fiscalNfse);
  } catch (error) {
    console.error('Error seeding FiscalNfse:', error);
  } finally {
    await prisma.$disconnect();
  }
}
