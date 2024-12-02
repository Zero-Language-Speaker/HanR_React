// src/App.js
import React, { useState, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { LearningMissionProvider } from './components/LearningMissionContext';
import axios from 'axios';

import Chatbot from 'react-chatbot-kit';
import config from './components/Config';
import Sidebar from './components/Sidebar';
import WordLearningPage from './components/WordLearningPage';
import VocabularyPage from './components/VocabularyPage';
import SentencePage from './components/SentencePage';
import WordListPage from './components/WordListPage';
import LoginForm from './components/LoginForm';
import ScenarioChatBot from './components/ScenarioChatBot';

import MessageParser from './components/MessageParser';
import ActionProvider from './components/ActionProvider';
import ExplainPage from './components/ExplainPage';

import './App.css';
// import { response } from 'express';

const App = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatbotInput, setChatbotInput] = useState('');
  const [chatContext, setChatContext] = useState({"word": "", "definition": ""});

  const handleStartLearningMission = (word, meaning) => {
    console.log('handleStartLearningMission called in App with word:', word, meaning);
    setChatbotInput(word);
    setChatContext({"word": word, "definition": meaning.definition})
    setShowChatBot(true);

    // generateMission(word, meaning.definition)

    // if (actionProviderRef.current) { // Ref 작동 안 하는 듯
    //   actionProviderRef.current.handleLearningMission(word);
    // }
  };
  // const actionProviderRef = useRef();

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
    setChatContext({"word": "", "definition": ""})
  };

  return (
    <LearningMissionProvider onStartLearningMission={handleStartLearningMission}>
    <div className="app">

      <Sidebar toggleChatBot={toggleChatBot} showChatBot={showChatBot} />



      <main className="main-content">
        <Routes>
          <Route path="/" element={<VocabularyPage />} />
          <Route path="/word-learning" element={<WordLearningPage />} />
          <Route path="/sentences" element={<SentencePage />} />
          <Route path="/explain" element={<ExplainPage />} />
          <Route path="/word-list" element={<WordListPage onStartLearningMission={handleStartLearningMission} />} />
        </Routes>
      </main>

      {showChatBot && (<ScenarioChatBot onClose={toggleChatBot} chatContext={chatContext} userInput={chatbotInput}/>)}
    </div>
    </LearningMissionProvider>
  );
};

export default App;