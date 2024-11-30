// src/App.js
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

import Chatbot from 'react-chatbot-kit';
import Sidebar from './components/Sidebar';
import WordLearningPage from './components/WordLearningPage';
import VocabularyPage from './components/VocabularyPage';
import SentencePage from './components/SentencePage';
import WordListPage from './components/WordListPage';
import LoginForm from './components/LoginForm';
import ScenarioChatBot from './components/ScenarioChatBot';
import './App.css';

const App = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatbotInput, setChatbotInput] = useState('');

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className="app">

      <Sidebar toggleChatBot={toggleChatBot} showChatBot={showChatBot} />
      

      <main className="main-content">
        <Routes>
          <Route path="/" element={<VocabularyPage />} />
          <Route path="/word-learning" element={<WordLearningPage />} />
          <Route path="/sentences" element={<SentencePage />} />
          <Route path="/word-list" element={<WordListPage />} />
        </Routes>
      </main>
      {showChatBot && <ScenarioChatBot onClose={toggleChatBot} />}
    </div>
  );
};

export default App;