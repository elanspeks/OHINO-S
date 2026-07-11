import React, { useState } from 'react';
import { SettingsPanel, Button, Card } from '@ohino/ui-components';
import { useRouter } from '../../router';

export const SettingsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [settings, setSettings] = useState({
    theme: 'auto',
    notifications: true,
    offlineMode: true,
    dataSharing: false,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const sections = [
    {
      id: 'appearance',
      label: 'Appearance',
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'select' as const,
          value: settings.theme,
          onChange: (v) => handleSettingChange('theme', v),
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Auto', value: 'auto' },
          ],
        },
      ],
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      settings: [
        {
          id: 'notifications',
          label: 'Enable Notifications',
          type: 'toggle' as const,
          value: settings.notifications,
          onChange: (v) => handleSettingChange('notifications', v),
        },
        {
          id: 'dataSharing',
          label: 'Allow Data Sharing for Improvements',
          type: 'toggle' as const,
          value: settings.dataSharing,
          onChange: (v) => handleSettingChange('dataSharing', v),
        },
      ],
    },
    {
      id: 'offline',
      label: 'Offline Mode',
      settings: [
        {
          id: 'offlineMode',
          label: 'Enable Offline Mode',
          type: 'toggle' as const,
          value: settings.offlineMode,
          onChange: (v) => handleSettingChange('offlineMode', v),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Button onClick={() => navigate('/dashboard')}>← Back</Button>
        <h1 className="text-3xl font-bold mt-4 mb-8">Settings</h1>

        <SettingsPanel title="Application Settings" sections={sections} />

        <div className="mt-8">
          <Card title="About" description="Version and system information">
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold">Version:</span> 1.0.0
              </div>
              <div>
                <span className="font-semibold">Build:</span> 2026.07.11
              </div>
              <div>
                <span className="font-semibold">Status:</span> ✓ Online
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex gap-4">
          <Button variant="secondary" fullWidth>
            Export Settings
          </Button>
          <Button variant="secondary" fullWidth>
            Clear Cache
          </Button>
        </div>
      </div>
    </div>
  );
};
