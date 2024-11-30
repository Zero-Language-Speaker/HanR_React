// ScenarioChatBot.jsx
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './Config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import './ScenarioChatBot.css';

const ScenarioChatBot = ({ onClose, userInput, actionProviderRef }) => {
  return (
    <div className="scenario-chatbot-overlay">
      <div className="scenario-chatbot-window">
        <div className="scenario-chatbot-header">
          <h2>한글한알 AI Chat</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="scenario-chatbot-content">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText="한글한알 AI와 어휘력을 길러 보세요"
            userInput={userInput}
            actionProviderRef={actionProviderRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ScenarioChatBot;