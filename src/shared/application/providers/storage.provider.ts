import { Injectable } from '@nestjs/common';
import { IStorageProvider } from '../../domain/providers/storage.provider';
import { EnvConfigService } from '../../infrastructure/env-config/env-config.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageProvider implements IStorageProvider {
  private storagePath: string;

  constructor(
    private readonly envService: EnvConfigService,
    storage?: string,
  ) {
    this.storagePath =
      storage ||
      path.resolve(__dirname, '../../../../../', this.envService.getStorage());
  }
  deleteFile(fileName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(this.getFilePath(fileName), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public getFilePath(fileName: string): string {
    return path.join(this.storagePath, fileName);
  }

  public async saveFile(fileName: string, file: Buffer): Promise<void> {
    const filePath = this.getFilePath(fileName);
    console.log(filePath);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  readFile(fileName: string): Promise<Buffer> {
    if (!fileName) {
      throw new Error('File name is required');
    }
    return new Promise((resolve, reject) => {
      fs.readFile(this.getFilePath(fileName), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  get storage(): string {
    return this.storagePath;
  }
}
