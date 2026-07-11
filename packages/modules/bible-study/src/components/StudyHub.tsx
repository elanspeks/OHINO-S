import React, { useState } from 'react';
import { Card, Button, Input } from '@ohino/ui-components';

export const StudyHub: React.FC = () => {
  const [reflection, setReflection] = useState('');
  const studyPlans = [
    { id: 'nt-overview', title: 'New Testament Overview' },
    { id: 'ot-overview', title: 'Old Testament Overview' },
    { id: 'psalms', title: 'Psalms & Proverbs' },
    { id: 'gospels', title: 'The Four Gospels' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bible Study</h2>

      <Card title="Study Plans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {studyPlans.map((plan) => (
            <Button key={plan.id} variant="secondary" fullWidth>
              {plan.title}
            </Button>
          ))}
        </div>
      </Card>

      <Card title="Daily Devotion">
        <div className="bg-blue-50 p-4 rounded mb-4">
          <p className="font-semibold mb-2">Psalm 23:1</p>
          <p className="italic text-gray-700">
            "The LORD is my shepherd, I lack nothing."
          </p>
        </div>
        <Button fullWidth>Read Full Passage</Button>
      </Card>

      <Card title="Reflect on Today's Verse">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your thoughts and reflections..."
          className="w-full p-3 border rounded-lg mb-3 resize-none"
          rows={4}
        />
        <Button fullWidth>Save Reflection</Button>
      </Card>

      <Card title="Recent Bookmarks">
        <div className="space-y-2">
          <div className="p-2 bg-yellow-50 rounded text-sm">John 3:16</div>
          <div className="p-2 bg-yellow-50 rounded text-sm">Romans 8:28</div>
          <div className="p-2 bg-yellow-50 rounded text-sm">Proverbs 3:5-6</div>
        </div>
      </Card>
    </div>
  );
};
