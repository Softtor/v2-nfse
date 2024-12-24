import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

export const createPrismaMock = (): jest.Mocked<PrismaClient> => {
  const fiscalEmitterMock = {
    findUnique: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    findMany: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    create: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    update: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    delete: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    count: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
  };

  const fiscalNfConfigMock = {
    findUnique: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    findMany: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    findFirst: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    create: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    update: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    delete: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
    count: jest.fn().mockReturnValue({
      then: jest.fn(),
    }),
  };

  return {
    fiscalEmitter: fiscalEmitterMock as any,
    fiscalNfConfig: fiscalNfConfigMock as any,
  } as unknown as jest.Mocked<PrismaClient>;
};
