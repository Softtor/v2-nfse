import { seedFiscalBatchsRps } from './fiscalBatch.seeder';
import { seedFiscalEmitter } from './fiscalEmitter.seeder';
import { seedFiscalNfConfig } from './fiscalNfConfig.seeder';

import { seedFiscalNfse } from './fiscalNfse.seeder';
import { seedFiscalProvider } from './fiscalProvider.sedder';

import { seedFiscalRps } from './fiscalRps.seeder';
import { seedFiscalServices } from './fiscalService.seeder';
import { seedFiscalTakers } from './fiscalTaker.seeder';

export async function main() {
  await seedFiscalEmitter();
  await seedFiscalProvider();
  await seedFiscalNfConfig();

  if (process.env.NODE_ENV === 'development') {
    console.log('Running development seeders...');
    await seedFiscalTakers();
    await seedFiscalServices();
    await seedFiscalBatchsRps();
    await seedFiscalRps();
    await seedFiscalNfse();
  } else {
    console.log(
      'Skipping development seeders because NODE_ENV is not "development".',
    );
  }
}

main().catch((error) => {
  console.error('Error running seeders:', error);
  process.exit(1);
});
