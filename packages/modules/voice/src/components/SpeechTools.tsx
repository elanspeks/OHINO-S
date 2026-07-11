import React, { useState } from 'react';
import { Card, Button } from '@ohino/ui-components';

export const SpeechTools: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const exercises = [
    { id: 'pronunciation', name: '🗣️ Pronunciation Practice' },
    { id: 'fluency', name: '⚡ Fluency Exercises' },
    { id: 'conversation', name: '💬 Conversation Starters' },
    { id: 'storytelling', name: '📖 Storytelling' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Speech & Communication Tools</h2>

      <Card title="Voice Recording">
        <Button
          onClick={() => setIsRecording(!isRecording)}
          variant={isRecording ? 'danger' : 'primary'}
          fullWidth
        >
          {isRecording ? '⏹️ Stop Recording' : '🎤 Start Recording'}
        </Button>
        {isRecording && (
          <p className="text-center text-red-600 mt-3 animate-pulse">Recording...</p>
        )}
      </Card>

      <Card title="Practice Exercises">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exercises.map((ex) => (
            <Button key={ex.id} variant="secondary" fullWidth>
              {ex.name}
            </Button>
          ))}
        </div>
      </Card>

      <Card title="Recent Recordings">
        <div className="space-y-2">
          <div className="p-2 bg-gray-50 rounded">Today - 2:30 PM</div>
          <div className="p-2 bg-gray-50 rounded">Yesterday - 10:15 AM</div>
          <div className="p-2 bg-gray-50 rounded">3 days ago - 4:45 PM</div>
        </div>
      </Card>
    </div>
  );
};
