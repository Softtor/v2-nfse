import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';
import { ConfigService } from '@nestjs/config';

describe('EnvConfigService Unit Tests', () => {
  let sut: EnvConfigService;

  const mockConfigValues = {
    FORWARD_BACKEND_PORT: 4000,
    NODE_ENV: 'test',
    JWT_SECRET: 'fake_secret',
    JWT_EXPIRES_IN: 900,
  };

  const mockConfigService = {
    get: jest.fn((key: string) => mockConfigValues[key] || null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [
        EnvConfigService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the variable FORWARD_BACKEND_PORT', () => {
    expect(sut.getAppPort()).toBe(4000);
  });

  it('should return the variable NODE_ENV', () => {
    expect(sut.getNodeEnv()).toBe('test');
  });

  it('should return the variable JWT_SECRET', () => {
    expect(sut.getJwtSecret()).toBe('fake_secret');
  });

  it('should return the variable JWT_EXPIRES_IN', () => {
    expect(sut.getJwtExpiresInSeconds()).toBe(900);
  });

  it('should return sut.getPagarMeAuthToken()', () => {
    const pagarMeAuthToken = sut.getPagarMeAuthToken();
    expect(pagarMeAuthToken).toBeDefined();
  });
});
