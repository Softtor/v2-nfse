export interface IStorageProvider {
  getFilePath(fileName: string): string;
  saveFile(fileName: string, file: Buffer): Promise<void>;
  deleteFile(fileName: string): Promise<void>;
  readFile(fileName: string): Promise<Buffer>;
  storage: string;
}
