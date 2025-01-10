import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalNfConfig() {
  try {
    const fiscalNfConfig = await prisma.fiscalNfConfig.upsert({
      where: { emitter_id: 1 },
      update: {
        serie: '2',
        next_document_number: 36,
        simple_national: true,
        taxation_regime: 'MICROEMPRESA_MUNICIPAL',
        operation_nature: '1',
        cultural_incentive: false,
        fiscal_incentive: false,
        updated_at: new Date(),
      },
      create: {
        serie: '2',
        next_document_number: 36,
        simple_national: true,
        taxation_regime: 'MICROEMPRESA_MUNICIPAL',
        operation_nature: '1',
        cultural_incentive: false,
        fiscal_incentive: false,
        emitter: { connect: { id: 1 } },
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log('FiscalNfConfig seeded:', fiscalNfConfig);
  } catch (error) {
    console.error('Error seeding FiscalNfConfig:', error);
  } finally {
    await prisma.$disconnect();
  }
}
