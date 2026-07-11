import React from 'react';
import { Card, Button, FormGroup, Input } from '@ohino/ui-components';
import { useRouter } from '../../router';

export const ProfilePage: React.FC = () => {
  const { navigate } = useRouter();
  const [profile, setProfile] = React.useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    learningStyle: 'visual',
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Button onClick={() => navigate('/dashboard')}>← Back</Button>
        <h1 className="text-3xl font-bold mt-4 mb-8">Profile</h1>

        <Card>
          <FormGroup label="Full Name" required>
            <Input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              fullWidth
            />
          </FormGroup>

          <FormGroup label="Email" required>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              fullWidth
            />
          </FormGroup>

          <FormGroup label="Age">
            <Input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
              fullWidth
            />
          </FormGroup>

          <FormGroup label="Learning Style">
            <select
              value={profile.learningStyle}
              onChange={(e) => setProfile({ ...profile, learningStyle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="visual">Visual</option>
              <option value="auditory">Auditory</option>
              <option value="kinesthetic">Kinesthetic</option>
              <option value="mixed">Mixed</option>
            </select>
          </FormGroup>

          <div className="flex gap-3">
            <Button fullWidth>Save Changes</Button>
            <Button variant="secondary" fullWidth>
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
