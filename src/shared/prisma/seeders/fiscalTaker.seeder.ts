import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalTakers() {
  try {
    const fiscalTaker = await prisma.fiscalTaker.upsert({
      where: { id: 'a47a972c-c1eb-11ef-8783-0242ac120002' },
      update: {
        document: '07193020137',
        name: 'Joao Victor de Oliveira',
        address: 'Q R O Conjunto C',
        number: '4',
        complement: 'Apos a adm',
        neighborhood: 'Candangolandia',
        city_code: '5300108',
        state: 'PR',
        zip_code: '12345-678',
        is_foreign: false,
        country_code: null,
        phone: '41987654321',
        email: 'thiagovt.dev@gmail.com',
      },
      create: {
        id: 'a47a972c-c1eb-11ef-8783-0242ac120002',
        document: '07193020137',
        name: 'Joao Victor de Oliveira',
        address: 'Q R O Conjunto C',
        number: '4',
        complement: 'Apos a adm',
        neighborhood: 'Candangolandia',
        city_code: '5300108',
        state: 'PR',
        zip_code: '12345-678',
        is_foreign: false,
        country_code: null,
        phone: '41987654321',
        email: 'thiagovt.dev@gmail.com',
        created_at: new Date('2024-12-24T11:38:49.000Z'),
        updated_at: new Date('2024-12-24T11:38:49.000Z'),
      },
    });

    console.log('FiscalTaker seeded:', fiscalTaker);
  } catch (error) {
    console.error('Error seeding FiscalTakers:', error);
  } finally {
    await prisma.$disconnect();
  }
}
