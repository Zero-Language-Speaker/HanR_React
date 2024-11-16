// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WordListPage from './components/WordListPage';
import VocabularyPage from './components/VocabularyPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/word-list" element={<WordListPage />} />
      <Route path="/" element={<VocabularyPage />} />
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default AppRoutes;