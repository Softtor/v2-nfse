import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function seedFiscalServices() {
  try {
    const fiscalServices = [
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Premium Mês',
        external_plan_code: 'df985ee4-5e6c-48f4-b521-eadf2d91955a',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Premium Trimestral',
        external_plan_code: 'b2a5edbf-f006-4736-a841-c7e04f9e27f8',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Premium Semestral',
        external_plan_code: 'b522086d-3f9b-42ae-92c8-936011f6f91c',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Premium Anual',
        external_plan_code: '4dd0a8cf-1b80-43a6-b3aa-c2818547da1a',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Gold Mês',
        external_plan_code: '922334ff-243e-4ea2-a5f5-387d392caaec',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Gold Trimestral',
        external_plan_code: 'e8140339-6e7c-4f40-b14b-9d24a11bdbc3',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Gold Semestral',
        external_plan_code: '6f71c265-5564-47d7-aaa9-9ac792d245ab',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Gold Anual',
        external_plan_code: '99d86e4a-b0dc-4a29-ba0d-fad912efa391',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Fiscal Mês',
        external_plan_code: 'b41e8dce-af38-4db6-8f07-ce2cded05877',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Fiscal Trimestral',
        external_plan_code: 'e44ffaeb-5959-43a2-9f5f-80b086862aa1',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Fiscal Semestral',
        external_plan_code: 'e050a10c-9b65-4c3a-adbb-935c4cdb9091',
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        service_value: 10.0,
        service_description: 'Fiscal Anual',
        external_plan_code: 'f8589b44-661a-4b54-9bc7-18b8f5bdba18',
        created_at: new Date(),
      },
    ];

    for (const service of fiscalServices) {
      const fiscalService = await prisma.fiscalService.upsert({
        where: { id: service.id },
        update: {
          service_value: service.service_value,
          service_description: service.service_description,
        },
        create: {
          id: service.id,
          service_value: service.service_value,
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
          service_description: service.service_description,
          municipality_code: '4106902',
          iss_exigibility: 0,
          incidence_municipality: 'Curitiba',
          external_plan_code: service.external_plan_code,
          created_at: service.created_at,
        },
      });

      console.log('FiscalService seeded:', fiscalService);
    }
  } catch (error) {
    console.error('Error seeding FiscalServices:', error);
  } finally {
    await prisma.$disconnect();
  }
}
