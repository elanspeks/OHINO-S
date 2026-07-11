import React, { useState } from 'react';
import { Card, Button, Input, ChatMessage } from '@ohino/ui-components';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant',
        content: `I understand: ${input}. How can I help you further?`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <Card title="OHINO-S AI Assistant" className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}
          {loading && <div className="text-gray-500 italic">Thinking...</div>}
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            fullWidth
          />
          <Button onClick={handleSend} loading={loading}>
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};
