import React from 'react';
import { Card, Button } from '@ohino/ui-components';

export const WellnessDashboard: React.FC = () => {
  const activities = [
    { name: 'Walking', icon: '🚶', duration: '30 min', calories: 120 },
    { name: 'Swimming', icon: '🏊', duration: '45 min', calories: 300 },
    { name: 'Yoga', icon: '🧘', duration: '60 min', calories: 180 },
    { name: 'Cycling', icon: '🚴', duration: '30 min', calories: 250 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Health & Wellness</h2>

      <Card title="Today's Activity">
        <div className="text-3xl font-bold text-green-600 mb-2">420 cal</div>
        <div className="text-sm text-gray-600">Goal: 500 cal</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }} />
        </div>
      </Card>

      <Card title="Quick Activities">
        <div className="grid grid-cols-2 gap-3">
          {activities.map((activity) => (
            <Button key={activity.name} variant="secondary" fullWidth>
              {activity.icon} {activity.name}
            </Button>
          ))}
        </div>
      </Card>

      <Card title="This Week's Summary">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total Calories</span>
            <span className="font-bold">2,450</span>
          </div>
          <div className="flex justify-between">
            <span>Activities</span>
            <span className="font-bold">12</span>
          </div>
          <div className="flex justify-between">
            <span>Avg. Duration</span>
            <span className="font-bold">42 min</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
