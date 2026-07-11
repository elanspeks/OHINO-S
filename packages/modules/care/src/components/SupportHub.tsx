import React from 'react';
import { Card, Button } from '@ohino/ui-components';

export const SupportHub: React.FC = () => {
  const categories = [
    { id: 'autism', name: 'Autism', icon: '🧩' },
    { id: 'adhd', name: 'ADHD', icon: '⚡' },
    { id: 'dyslexia', name: 'Dyslexia', icon: '📖' },
    { id: 'anxiety', name: 'Anxiety', icon: '💭' },
    { id: 'sensory', name: 'Sensory', icon: '👁️' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Special Needs Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} hoverable>
            <div className="text-4xl mb-2">{cat.icon}</div>
            <h3 className="font-bold mb-2">{cat.name}</h3>
            <p className="text-sm text-gray-600 mb-3">Specialized resources and support tools</p>
            <Button size="sm" fullWidth>
              Explore
            </Button>
          </Card>
        ))}
      </div>

      <Card title="Therapeutic Goals">
        <p className="text-gray-600 mb-4">Track and manage therapeutic goals</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>Goal 1: Improve communication</span>
            <span className="text-green-600">✓</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>Goal 2: Develop social skills</span>
            <span className="text-yellow-600">In Progress</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
