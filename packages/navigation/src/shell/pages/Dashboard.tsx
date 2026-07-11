import React, { useState } from 'react';
import { Card, Button } from '@ohino/ui-components';
import { useRouter } from '../../router';

export const Dashboard: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const modules = [
    { id: 'ai', name: 'OHINO-S AI', icon: '🤖', description: 'AI Assistant', color: 'bg-blue-500' },
    { id: 'learn', name: 'OHINO-S Learn', icon: '📚', description: 'Learning', color: 'bg-green-500' },
    { id: 'care', name: 'OHINO-S Care', icon: '💝', description: 'Care Support', color: 'bg-pink-500' },
    { id: 'sense', name: 'OHINO-S Sense', icon: '🎯', description: 'Tracking', color: 'bg-purple-500' },
    { id: 'voice', name: 'OHINO-S Voice', icon: '🎤', description: 'Communication', color: 'bg-orange-500' },
    { id: 'connect', name: 'OHINO-S Connect', icon: '🤝', description: 'Relations', color: 'bg-red-500' },
    { id: 'health', name: 'OHINO-S Health', icon: '💪', description: 'Wellness', color: 'bg-cyan-500' },
    { id: 'vision', name: 'OHINO-S Vision', icon: '👁️', description: 'Vision', color: 'bg-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Select a module to continue.</p>
          </div>
          <Button onClick={() => navigate('/settings')}>⚙️ Settings</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card title="Active Sessions" footer="Today">
            <div className="text-3xl font-bold text-blue-600">5</div>
          </Card>
          <Card title="Learning Progress" footer="This Week">
            <div className="text-3xl font-bold text-green-600">78%</div>
          </Card>
          <Card title="Messages Processed" footer="This Month">
            <div className="text-3xl font-bold text-purple-600">234</div>
          </Card>
        </div>

        {/* Module Grid */}
        <h2 className="text-2xl font-bold mb-6">Available Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => (
            <Card
              key={module.id}
              hoverable
              onClick={() => navigate(`/modules/${module.id}`)}
            >
              <div className={`w-full h-20 rounded-lg ${module.color} flex items-center justify-center text-4xl mb-3 cursor-pointer`}>
                {module.icon}
              </div>
              <h3 className="font-bold text-lg">{module.name}</h3>
              <p className="text-sm text-gray-600">{module.description}</p>
              <Button size="sm" fullWidth className="mt-4" onClick={() => navigate(`/modules/${module.id}`)}>
                Open
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
