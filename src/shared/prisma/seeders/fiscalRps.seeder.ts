import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalRps() {
  try {
    const fiscalRps = await prisma.fiscalRps.upsert({
      where: { id: '2999915a-e9a2-4ea2-8e1b-db578b1029f9' },
      update: {
        number: 15,
        series: '1',
        issue_date_rps: new Date('2024-12-24T12:31:10.921Z'),
        type: 'RPS',
        status: 'NORMAL',
        competence: new Date('2024-12-24T00:00:00.000Z'),
        complementary_information: 'Nao informado',
        service_id: '95a384c3-c1ec-11ef-8783-0242ac120002',
        taker_id: 'a47a972c-c1eb-11ef-8783-0242ac120002',
        provider_id: '8bd07093-7231-4f12-96fe-f450f409bf0d',
        batch_id: 'eecc712f-9d47-485a-a10d-b5bb46dd78fc',
        service_description: null,
        cnae_code: null,
        activity_code: null,
      },
      create: {
        id: '2999915a-e9a2-4ea2-8e1b-db578b1029f9',
        number: 15,
        series: '1',
        issue_date_rps: new Date('2024-12-24T12:31:10.921Z'),
        type: 'RPS',
        status: 'NORMAL',
        competence: new Date('2024-12-24T00:00:00.000Z'),
        complementary_information: 'Nao informado',
        service_id: '95a384c3-c1ec-11ef-8783-0242ac120002',
        taker_id: 'a47a972c-c1eb-11ef-8783-0242ac120002',
        provider_id: '8bd07093-7231-4f12-96fe-f450f409bf0d',
        batch_id: 'eecc712f-9d47-485a-a10d-b5bb46dd78fc',
        service_description: null,
        cnae_code: null,
        activity_code: null,
      },
    });

    console.log('FiscalRps seeded:', fiscalRps);
  } catch (error) {
    console.error('Error seeding FiscalRps:', error);
  } finally {
    await prisma.$disconnect();
  }
}
