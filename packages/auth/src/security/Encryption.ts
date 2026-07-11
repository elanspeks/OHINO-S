/**
 * Encryption Utilities
 * Encrypt and decrypt sensitive data
 */

import CryptoJS from 'crypto-js';

export class Encryption {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  encrypt(data: string): string {
    try {
      return CryptoJS.AES.encrypt(data, this.secretKey).toString();
    } catch (error) {
      console.error('Encryption error:', error);
      return data;
    }
  }

  decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  }

  hash(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  generateSecureToken(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
}

export const createEncryption = (secretKey: string): Encryption => {
  return new Encryption(secretKey);
};
