import React, { useState } from 'react';
import { Card, Button, Input } from '@ohino/ui-components';

export const TrackingDashboard: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const emotions = ['Happy', 'Sad', 'Angry', 'Anxious', 'Calm', 'Excited'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Emotion & Behavior Tracking</h2>

      <Card title="How are you feeling?">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {emotions.map((emotion) => (
            <Button
              key={emotion}
              variant={selectedEmotion === emotion ? 'primary' : 'secondary'}
              onClick={() => setSelectedEmotion(emotion)}
              fullWidth
            >
              {emotion}
            </Button>
          ))}
        </div>
      </Card>

      {selectedEmotion && (
        <Card title={`What triggered this ${selectedEmotion.toLowerCase()} feeling?`}>
          <Input placeholder="Describe what happened..." fullWidth />
          <Button fullWidth className="mt-3">
            Log Entry
          </Button>
        </Card>
      )}

      <Card title="This Week's Patterns">
        <div className="space-y-2">
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Happy</span>
            <span className="font-bold">8 times</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Calm</span>
            <span className="font-bold">6 times</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Anxious</span>
            <span className="font-bold">2 times</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
