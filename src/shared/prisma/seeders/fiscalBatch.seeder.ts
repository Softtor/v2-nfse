import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalBatchsRps() {
  try {
    const fiscalBatch = await prisma.fiscalBatchNfse.upsert({
      where: { id: 'eecc712f-9d47-485a-a10d-b5bb46dd78fc' },
      update: {
        name: 7,
        sent_at: new Date('2024-12-24T12:31:10.921Z'),
        protocol: '123456789',
        receipt_date: new Date('2024-12-24T12:31:10.967Z'),
        batch_number: '7',
        provider_id: '8bd07093-7231-4f12-96fe-f450f409bf0d',
        confirmed_send_ws: true,
      },
      create: {
        id: 'eecc712f-9d47-485a-a10d-b5bb46dd78fc',
        name: 7,
        sent_at: new Date('2024-12-24T12:31:10.921Z'),
        protocol: '123456789',
        receipt_date: new Date('2024-12-24T12:31:10.967Z'),
        batch_number: '7',
        provider_id: '8bd07093-7231-4f12-96fe-f450f409bf0d',
        confirmed_send_ws: true,
      },
    });

    console.log('FiscalBatch seeded:', fiscalBatch);
  } catch (error) {
    console.error('Error seeding FiscalBatch:', error);
  } finally {
    await prisma.$disconnect();
  }
}
