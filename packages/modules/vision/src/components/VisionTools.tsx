import React, { useState } from 'react';
import { Card, Button } from '@ohino/ui-components';

export const VisionTools: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Computer Vision Preparation</h2>

      <Card title="⚠️ Beta Feature" description="Computer vision features are in preparation">
        <p className="text-gray-600 mb-4">
          This module is preparing for computer vision capabilities that will include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Object recognition and detection</li>
          <li>Scene understanding</li>
          <li>Image analysis</li>
          <li>Automated image descriptions</li>
          <li>Visual accessibility features</li>
        </ul>
      </Card>

      <Card title="Upload Image">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">📸 Select an image to analyze</p>
          <Button fullWidth>Choose File</Button>
        </div>
      </Card>

      <Card title="Coming Soon">
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-blue-50 rounded">✓ Object Detection</div>
          <div className="p-3 bg-blue-50 rounded">✓ Scene Analysis</div>
          <div className="p-3 bg-blue-50 rounded">✓ Image Descriptions</div>
          <div className="p-3 bg-blue-50 rounded">✓ Visual Search</div>
        </div>
      </Card>
    </div>
  );
};
