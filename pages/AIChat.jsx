import { useState, useRef, useEffect } from 'react';
import api from '../services/api';

let messageCounter = 1;
function generateMessageId() {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

/**
 * AIChat Page
 * Interactive conversation interface for the TwinMind Personal AI Companion.
 */
export default function AIChat({ skills = [], goals = [] }) {
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello! I am your TwinMind companion. I have access to your current skills matrix and goals. How can I help guide your learning journey today?",
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    'What should I learn next to prepare for an AI-ML internship?',
    'Which skill should I prioritize this week?',
    'How can I improve my Python and ML scores?',
    'Help break down my learning goals into milestones',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: generateMessageId(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await api.sendChatMessage(text, skills, goals);
      const aiResponse = {
        id: generateMessageId(),
        sender: 'ai',
        text: response.reply,
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          sender: 'ai',
          text: 'Sorry, I encountered an issue analyzing your query. Please try again.',
          timestamp: 'Now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Context Badge */}
      <div className="chat-context-bar">
        <span>🧠 Connected to TwinMind Memory:</span>
        <span className="context-stat">{skills.length} Skills</span>
        <span className="context-stat">{goals.filter((g) => !g.completed).length} Active Goals</span>
      </div>

      {/* Messages Feed */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'message-user' : 'message-ai'}`}>
            <div className="message-avatar">
              {msg.sender === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-bubble">
              <div className="message-header">
                <span className="message-sender-name">
                  {msg.sender === 'user' ? 'You' : 'TwinMind AI'}
                </span>
                <span className="message-time">{msg.timestamp}</span>
              </div>
              <div className="message-text">
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message message-ai">
            <div className="message-avatar">🤖</div>
            <div className="message-bubble loading-bubble">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="loading-text">Analyzing your skills and preparing roadmap...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="suggested-prompts">
        <span className="suggested-label">Suggested:</span>
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            type="button"
            className="prompt-chip"
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="chat-input-area">
        <textarea
          rows={2}
          placeholder="Ask TwinMind anything about your learning, career preparation, or skills..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          type="button"
          className="send-button"
          onClick={() => handleSend()}
          disabled={!inputValue.trim() || isLoading}
        >
          Send ↵
        </button>
      </div>
    </div>
  );
}
