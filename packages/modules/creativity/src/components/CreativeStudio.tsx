import React, { useState } from 'react';
import { Card, Button } from '@ohino/ui-components';

export const CreativeStudio: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const tools = [
    { id: 'writing', name: '✍️ Writing', icon: '📝' },
    { id: 'drawing', name: '🎨 Drawing', icon: '🖌️' },
    { id: 'music', name: '🎵 Music', icon: '🎼' },
    { id: 'storytelling', name: '📖 Storytelling', icon: '📚' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Creative Studio</h2>

      <Card title="Choose Your Creative Tool">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? 'primary' : 'secondary'}
              onClick={() => setSelectedTool(tool.id)}
              fullWidth
            >
              {tool.icon}
              <div className="text-xs">{tool.name}</div>
            </Button>
          ))}
        </div>
      </Card>

      {selectedTool && (
        <Card title={`Create with ${selectedTool}`}>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
            <p className="text-center text-gray-600 mb-4">
              Your creative workspace is ready!
            </p>
            <Button fullWidth>Start Creating</Button>
          </div>
        </Card>
      )}

      <Card title="Recent Projects">
        <div className="space-y-2">
          <div className="p-3 bg-purple-50 rounded">
            <p className="font-semibold">My Short Story</p>
            <p className="text-xs text-gray-600">Writing • 2 days ago</p>
          </div>
          <div className="p-3 bg-purple-50 rounded">
            <p className="font-semibold">Abstract Art</p>
            <p className="text-xs text-gray-600">Drawing • 5 days ago</p>
          </div>
          <div className="p-3 bg-purple-50 rounded">
            <p className="font-semibold">My Melody</p>
            <p className="text-xs text-gray-600">Music • 1 week ago</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
