// ScenarioChatBot.jsx
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../Chatbot/Config';
import MessageParser from '../Chatbot/MessageParser';
import ActionProvider from '../Chatbot/ActionProvider';
import './ScenarioChatBot.css';

const ScenarioChatBot = ({ onClose }) => {
  return (
    <div className="scenario-chatbot-overlay">
      <div className="scenario-chatbot-window">
        <div className="scenario-chatbot-header">
          <h2>시나리오 학습 AI</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="scenario-chatbot-content">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText="한글한알 AI와 어휘력을 길러 보세요"
          />
        </div>
      </div>
    </div>
  );
};

export default ScenarioChatBot;