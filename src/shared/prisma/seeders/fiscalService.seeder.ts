import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFiscalServices() {
  try {
    const fiscalService = await prisma.fiscalService.upsert({
      where: { id: '95a384c3-c1ec-11ef-8783-0242ac120002' },
      update: {
        service_value: 10.0,
        deduction_value: 0.0,
        pis_value: 0.0,
        cofins_value: 0.0,
        inss_value: 0.0,
        ir_value: 0.0,
        csll_value: 0.0,
        other_retentions: 0.0,
        total_tributes_value: 0.0,
        iss_value: 2.0,
        rate: 0.0,
        nbs_code: null,
        unconditional_discount: 0.0,
        conditional_discount: 0.0,
        iss_withheld: 2,
        service_item_list: '107',
        cnae_code: '6209100',
        municipal_taxation_code: '0107',
        service_description: 'Plano Gold Mensal',
        municipality_code: '4106902',
        iss_exigibility: 0,
        incidence_municipality: 'Curitiba',
        external_plan_code: 'PLAN-2024-01',
      },
      create: {
        id: '95a384c3-c1ec-11ef-8783-0242ac120002',
        service_value: 10.0,
        deduction_value: 0.0,
        pis_value: 0.0,
        cofins_value: 0.0,
        inss_value: 0.0,
        ir_value: 0.0,
        csll_value: 0.0,
        other_retentions: 0.0,
        total_tributes_value: 0.0,
        iss_value: 2.0,
        rate: 0.0,
        nbs_code: null,
        unconditional_discount: 0.0,
        conditional_discount: 0.0,
        iss_withheld: 2,
        service_item_list: '107',
        cnae_code: '6209100',
        municipal_taxation_code: '0107',
        service_description: 'Plano Gold Mensal',
        municipality_code: '4106902',
        iss_exigibility: 0,
        incidence_municipality: 'Curitiba',
        external_plan_code: 'PLAN-2024-01',
        created_at: new Date('2024-12-24T11:45:33.000Z'),
      },
    });

    console.log('FiscalService seeded:', fiscalService);
  } catch (error) {
    console.error('Error seeding FiscalServices:', error);
  } finally {
    await prisma.$disconnect();
  }
}
