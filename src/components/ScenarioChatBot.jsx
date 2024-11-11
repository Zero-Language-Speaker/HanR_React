// ScenarioChatBot.jsx
import React from 'react';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './ChatBotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ScenarioChatBot = () => {
  return (
    <div className="chatbot-container">
      <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
    </div>
  );
};

export default ScenarioChatBot;