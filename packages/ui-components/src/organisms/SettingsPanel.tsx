import React from 'react';

export interface SettingsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  sections: SettingsSection[];
}

interface SettingsSection {
  id: string;
  label: string;
  settings: SettingItem[];
}

interface SettingItem {
  id: string;
  label: string;
  type: 'toggle' | 'select' | 'text';
  value: any;
  onChange: (value: any) => void;
  options?: { label: string; value: any }[];
}

export const SettingsPanel = React.forwardRef<HTMLDivElement, SettingsPanelProps>(
  ({ title, sections, ...props }, ref) => {
    return (
      <div ref={ref} className="max-w-2xl mx-auto" {...props}>
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">{section.label}</h3>
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <label className="text-gray-700">{setting.label}</label>
                    {setting.type === 'toggle' && (
                      <input
                        type="checkbox"
                        checked={setting.value}
                        onChange={(e) => setting.onChange(e.target.checked)}
                        className="w-4 h-4"
                      />
                    )}
                    {setting.type === 'select' && (
                      <select
                        value={setting.value}
                        onChange={(e) => setting.onChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        {setting.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {setting.type === 'text' && (
                      <input
                        type="text"
                        value={setting.value}
                        onChange={(e) => setting.onChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

SettingsPanel.displayName = 'SettingsPanel';
