import React from 'react';
import { Card, Button } from '@ohino/ui-components';

export const SocialHub: React.FC = () => {
  const socialStories = [
    { id: 'making-friends', title: '👋 Making New Friends' },
    { id: 'handling-conflict', title: '⚠️ Handling Conflict' },
    { id: 'family-time', title: '👨‍👩‍👧 Family Time' },
    { id: 'group-situations', title: '👥 Group Situations' },
  ];

  const relationshipTips = [
    'Listen actively to others',
    'Share your feelings clearly',
    'Respect personal boundaries',
    'Practice empathy and understanding',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Relationship & Social Guidance</h2>

      <Card title="Social Stories">
        <div className="space-y-2">
          {socialStories.map((story) => (
            <Button key={story.id} variant="secondary" fullWidth>
              {story.title}
            </Button>
          ))}
        </div>
      </Card>

      <Card title="Relationship Tips">
        <div className="space-y-3">
          {relationshipTips.map((tip, idx) => (
            <div key={idx} className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Conflict Resolution">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">When conflicts arise, try these steps:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Take a pause and breathe</li>
            <li>Listen to their perspective</li>
            <li>Express your feelings calmly</li>
            <li>Find common ground</li>
            <li>Agree on a solution</li>
          </ol>
        </div>
      </Card>
    </div>
  );
};
