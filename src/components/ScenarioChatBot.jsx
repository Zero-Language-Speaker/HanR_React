// ScenarioChatBot.jsx
import React, { useState, useEffect } from 'react';
import Chatbot, { createChatBotMessage } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './Config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import './ScenarioChatBot.css';
import axios from 'axios';
import botIcon from './ChatBot.png';


const ScenarioChatBot = ({ onClose, chatContext, userInput}) => {

  return (
    <div className="scenario-chatbot-overlay">
      <div className="scenario-chatbot-window">
        <div className="scenario-chatbot-header">
          <h2>한글한알 AI Chat</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="scenario-chatbot-content">
          <Chatbot
            config={config(chatContext)}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            headerText="한글한알 AI와 어휘력을 길러 보세요"
            userInput={userInput}
          />
        </div>
      </div>
    </div>
  );
};

export default ScenarioChatBot;