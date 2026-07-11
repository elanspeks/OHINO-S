import React from 'react';
import { Card, Button } from '@ohino/ui-components';
import { useRouter } from '../../router';

export const ModuleLauncher: React.FC = () => {
  const { navigate } = useRouter();

  const modules = [
    {
      id: 'ai',
      name: 'OHINO-S AI',
      icon: '🤖',
      description: 'Intelligent conversational AI assistant with offline support',
      capabilities: ['Chat', 'Context Awareness', 'Offline Mode', 'Learning'],
      offlineCapable: true,
    },
    {
      id: 'learn',
      name: 'OHINO-S Learn',
      icon: '📚',
      description: 'Personalized learning assistance across multiple subjects',
      capabilities: ['Tutoring', 'Problem Solving', 'Progress Tracking', 'Adaptive Learning'],
      offlineCapable: true,
    },
    {
      id: 'care',
      name: 'OHINO-S Care',
      icon: '💝',
      description: 'Specialized support for special needs and unique requirements',
      capabilities: ['Resource Library', 'Support Tools', 'Therapy Guides', 'Progress Notes'],
      offlineCapable: true,
    },
    {
      id: 'sense',
      name: 'OHINO-S Sense',
      icon: '🎯',
      description: 'Track behavior, emotions, and daily patterns',
      capabilities: ['Behavior Tracking', 'Emotion Logging', 'Pattern Analysis', 'Reports'],
      offlineCapable: true,
    },
    {
      id: 'voice',
      name: 'OHINO-S Voice',
      icon: '🎤',
      description: 'Speech and communication enhancement tools',
      capabilities: ['Speech Recognition', 'TTS', 'Communication Aids', 'Practice'],
      offlineCapable: true,
    },
    {
      id: 'connect',
      name: 'OHINO-S Connect',
      icon: '🤝',
      description: 'Guidance for relationships and social interaction',
      capabilities: ['Relationship Tips', 'Social Stories', 'Interaction Guides', 'Support'],
      offlineCapable: true,
    },
    {
      id: 'health',
      name: 'OHINO-S Health',
      icon: '💪',
      description: 'Health and wellness support and tracking',
      capabilities: ['Health Tracking', 'Wellness Tips', 'Exercise Guides', 'Nutrition'],
      offlineCapable: true,
    },
    {
      id: 'vision',
      name: 'OHINO-S Vision',
      icon: '👁️',
      description: 'Computer vision preparation for future capabilities',
      capabilities: ['Image Recognition', 'Object Detection', 'Scene Understanding', 'Preparation'],
      offlineCapable: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button onClick={() => navigate('/dashboard')}>← Back to Dashboard</Button>
          <h1 className="text-3xl font-bold mt-4">Module Launcher</h1>
          <p className="text-gray-600">Access all available OHINO-S modules</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Card key={module.id} hoverable>
              <div className="flex gap-4">
                <div className="text-5xl">{module.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{module.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {module.capabilities.map((cap) => (
                      <span key={cap} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {cap}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {module.offlineCapable ? '✓ Offline Capable' : '⚠️ Online Only'}
                    </div>
                    <Button size="sm" onClick={() => navigate(`/modules/${module.id}`)}>
                      Launch
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
