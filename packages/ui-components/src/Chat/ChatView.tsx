import React, { useState } from 'react';
import MessageItem from './MessageItem';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  createdAt?: number;
};

type Props = {
  initialMessages?: ChatMessage[];
  onSend?: (prompt: string) => Promise<ChatMessage> | ChatMessage | void;
};

export default function ChatView({ initialMessages = [], onSend }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: `m_${Date.now()}`, role: 'user', text: input.trim(), createdAt: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (onSend) {
      setSending(true);
      try {
        const result = await Promise.resolve(onSend(userMsg.text));
        if (result) {
          const resp = typeof result === 'object' ? result : { id: `m_${Date.now()}_r`, role: 'assistant', text: String(result), createdAt: Date.now() };
          setMessages(prev => [...prev, resp as ChatMessage]);
        }
      } finally {
        setSending(false);
      }
    }
  }

  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      <div style={{flex:1, overflow:'auto', maxHeight:400, border:'1px solid #eee', padding:8}}>
        {messages.map(m => <MessageItem key={m.id} message={m} />)}
      </div>
      <div style={{display:'flex', gap:8}}>
        <input value={input} onChange={e => setInput(e.target.value)} style={{flex:1, padding:8}} placeholder="Type a message..." />
        <button onClick={handleSend} disabled={sending || !input.trim()} className="ohino-btn ohino-btn--primary">Send</button>
      </div>
    </div>
  );
}
