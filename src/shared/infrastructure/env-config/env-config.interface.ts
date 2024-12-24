export interface EnvConfig {
  getAppPort(): number;
  getNodeEnv(): string;
  getJwtSecret(): string;
  getJwtExpiresInSeconds(): number;
  getDatabaseUrl(): string;
  getFrontendUrl(): string;
  getBackendUrl(): string;
}
