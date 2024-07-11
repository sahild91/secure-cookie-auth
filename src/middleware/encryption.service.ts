import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { cfg } from '../utils/env';

@Injectable()
export class EncryptionService {
  private privateKey: string;

  constructor() {
    this.privateKey = cfg.keys.privateKey;
  }

  decryptData(encryptedData: string): any {
    const buffer = Buffer.from(encryptedData, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      buffer,
    );
    return JSON.parse(decrypted.toString('utf8'));
  }
}
