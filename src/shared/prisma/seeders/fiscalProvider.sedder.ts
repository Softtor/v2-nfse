import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalProvider() {
  try {
    const fiscalProvider = await prisma.fiscalProvider.upsert({
      where: { cnpj: '46.204.900/0001-51' },
      update: {
        cnpj: '46.204.900/0001-51',
        municipal_subscription: '010112006414',
        emitter: { connect: { id: 1 } },
        updated_at: new Date(),
      },
      create: {
        cnpj: '46.204.900/0001-51',
        municipal_subscription: '010112006414',
        emitter: { connect: { id: 1 } },
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log('FiscalProvider seeded:', fiscalProvider);
  } catch (error) {
    console.error('Error seeding FiscalProvider:', error);
  } finally {
    await prisma.$disconnect();
  }
}
