import { seedFiscalEmitter } from './fiscalEmitter.seeder';
import { seedFiscalNfConfig } from './fiscalNfConfig.seeder';
import { seedFiscalProvider } from './fiscalProvider.sedder';

export async function main() {
  await seedFiscalEmitter();
  await seedFiscalProvider();
  await seedFiscalNfConfig();
}

main();
