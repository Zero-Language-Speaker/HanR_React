// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import VocabularyPage from './components/VocabularyPage';
import WordListPage from './components/WordListPage';

function App() {
  // Word list state (shared between VocabularyPage and WordListPage)
  const [words] = useState([
    { id: 1, word: '사랑스럽다', meaning: '생김새나 뜻이 사랑을 느낄 정도로 귀엽다' },
    { id: 2, word: '에멜무지로', meaning: '단단하게 묶지 않은 모양' },
    { id: 3, word: '샘바리', meaning: '어떠한 일에 샘이 많아 안달하는 마음이 강한 사람' },
    { id: 4, word: '하르르하다', meaning: '종이나 옷감 따위가 얇고 매우 보드랍다' },
    { id: 5, word: '각다분하다', meaning: '일을 해 나가기가 몹시 힘들고 고되다' },
    // Add more words as necessary...
  ]);

  return (
    <div className="App">
      <Routes>
        {/* Pass words as props */}
        <Route path="/" element={<VocabularyPage words={words} />} />
        <Route path="/word-list" element={<WordListPage words={words} />} />
      </Routes>
    </div>
  );
}

export default App;