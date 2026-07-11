/**
 * Password Manager
 * Password validation and hashing
 */

import CryptoJS from 'crypto-js';

export class PasswordManager {
  private saltRounds = 10;

  validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain an uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain a lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain a number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain a special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  hashPassword(password: string): string {
    // In production, use bcrypt or argon2
    return CryptoJS.SHA256(password + 'ohino-salt').toString();
  }

  comparePassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }

  generateTemporaryPassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let password = '';

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  }
}

export const createPasswordManager = (): PasswordManager => {
  return new PasswordManager();
};
