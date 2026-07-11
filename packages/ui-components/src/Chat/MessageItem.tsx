import React from 'react';
import type { ChatMessage } from './ChatView';

type Props = {
  message: ChatMessage;
};

export default function MessageItem({ message }: Props) {
  const align = message.role === 'user' ? 'flex-end' : message.role === 'assistant' ? 'flex-start' : 'center';
  const bg = message.role === 'user' ? '#e6f7ff' : message.role === 'assistant' ? '#f5f5f5' : '#fffbe6';
  return (
    <div style={{display:'flex', justifyContent:align, marginBottom:8}}>
      <div style={{background:bg, padding:10, borderRadius:8, maxWidth:'80%'}}>
        <div style={{fontSize:14, whiteSpace:'pre-wrap'}}>{message.text}</div>
        <div style={{marginTop:6, fontSize:11, color:'#666'}}>{new Date(message.createdAt || Date.now()).toLocaleString()}</div>
      </div>
    </div>
  );
}
