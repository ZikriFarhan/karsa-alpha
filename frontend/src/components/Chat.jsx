import React, { useState } from 'react';
import './Chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);  
  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, user: { name: 'Zikri', preferensi_bahasa: 'formal', minat: ['AI', 'Teknologi'] } })
      });
      const data = await response.json();
      setChat([...newChat, { role: 'bot', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}        
          placeholder="Ketik pesan..."
        />
        <button onClick={sendMessage}>Kirim</button>
      </div>
    </div>
  );
}

export default Chat;