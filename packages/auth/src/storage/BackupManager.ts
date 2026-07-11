/**
 * Backup Manager
 * Export and import user data
 */

import type { UserProfile, ChildProfile } from '@ohino/types';

export interface BackupData {
  version: string;
  timestamp: Date;
  user: UserProfile | null;
  children: ChildProfile[];
  conversations: any[];
  metadata: Record<string, any>;
}

export class BackupManager {
  async createBackup(
    user: UserProfile | null,
    children: ChildProfile[],
    conversations: any[]
  ): Promise<BackupData> {
    const backup: BackupData = {
      version: '1.0.0',
      timestamp: new Date(),
      user,
      children,
      conversations,
      metadata: {
        backupSize: JSON.stringify({ user, children, conversations }).length,
        deviceId: this.getDeviceId(),
      },
    };

    return backup;
  }

  async exportBackup(backup: BackupData): Promise<Blob> {
    const json = JSON.stringify(backup, null, 2);
    return new Blob([json], { type: 'application/json' });
  }

  async importBackup(blob: Blob): Promise<BackupData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          resolve(data as BackupData);
        } catch (error) {
          reject(new Error('Invalid backup file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read backup file'));
      };

      reader.readAsText(blob);
    });
  }

  downloadBackup(backup: BackupData, filename: string = 'ohino-backup.json'): void {
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  private getDeviceId(): string {
    let deviceId = localStorage.getItem('ohino_device_id');
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('ohino_device_id', deviceId);
    }
    return deviceId;
  }
}

export const createBackupManager = (): BackupManager => {
  return new BackupManager();
};
