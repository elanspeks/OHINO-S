import React from 'react';
import { Button, Card } from '@ohino/ui-components';
import { useRouter } from '../../router';

export const WelcomePage: React.FC = () => {
  const { navigate } = useRouter();

  const features = [
    {
      icon: '📚',
      title: 'OHINO-S AI',
      description: 'Intelligent conversational AI assistant',
    },
    {
      icon: '🎓',
      title: 'OHINO-S Learn',
      description: 'Personalized learning assistance',
    },
    {
      icon: '💝',
      title: 'OHINO-S Care',
      description: 'Special needs support and resources',
    },
    {
      icon: '🎯',
      title: 'OHINO-S Sense',
      description: 'Behavior and emotion tracking',
    },
    {
      icon: '🎤',
      title: 'OHINO-S Voice',
      description: 'Speech and communication tools',
    },
    {
      icon: '🤝',
      title: 'OHINO-S Connect',
      description: 'Relationship guidance and support',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to OHINO-S</h1>
          <p className="text-xl text-blue-100 mb-8">
            Understanding Beyond Words - Your Personal AI Ecosystem
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/dashboard')}
              variant="primary"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/settings')}
              variant="secondary"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Powerful Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              title={feature.title}
              description={feature.description}
              hoverable
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-8">
            Create your profile and unlock the full potential of OHINO-S
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            fullWidth
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};
