import React, { useState } from 'react';
import { Card, Button } from '@ohino/ui-components';

export const LearningDashboard: React.FC = () => {
  const subjects = ['Math', 'Science', 'History', 'Language', 'Arts'];
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Learning Paths</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card key={subject} hoverable onClick={() => setSelectedSubject(subject)}>
            <h3 className="text-lg font-bold mb-2">{subject}</h3>
            <div className="mb-3">
              <div className="text-sm text-gray-600 mb-1">Progress: 45%</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: '45%' }}
                />
              </div>
            </div>
            <Button size="sm" fullWidth>
              Continue
            </Button>
          </Card>
        ))}
      </div>

      {selectedSubject && (
        <Card title={`${selectedSubject} Lessons`}>
          <p className="text-gray-600 mb-4">Select a lesson to begin learning.</p>
          <div className="space-y-2">
            <Button fullWidth>Lesson 1: Introduction</Button>
            <Button fullWidth>Lesson 2: Fundamentals</Button>
            <Button fullWidth>Lesson 3: Advanced Concepts</Button>
          </div>
        </Card>
      )}
    </div>
  );
};
