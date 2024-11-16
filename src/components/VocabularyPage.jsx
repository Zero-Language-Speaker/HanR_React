import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VocabularyPage.css';

const VocabularyPage = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatBot, setShowChatBot] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3001/api/words');
        setWords(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching words:', err);
        setError('Failed to load words. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchWords();
  }, []);

  const nextWord = () => {
    if (words.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  };

  const prevWord = () => {
    if (words.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
    }
  };

  const getRandomWord = () => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setCurrentIndex(randomIndex);
    }
  };

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    
    <div className="vocabulary-page">

      {/* Main Content */}
      <main className="main-content">
        {/* Top buttons */}
        <div className="top-buttons">
          <button className="recommend-btn" onClick={getRandomWord}>오늘의 추천 단어</button>
          <button className="review-btn" onClick={getRandomWord}>오늘의 복습 단어</button>
        </div>

        {/* Word Display Section with Scroll Buttons */}
        <div className="word-display-section">
          
          {/* Left Arrow */}
          <button className="arrow left-arrow" onClick={prevWord}>←</button>

          {/* Display current word */}
          {words.length > 0 ? (
            <div className="word-display">
              <h3>{words[currentIndex].word}</h3>
              <p>{words[currentIndex].meaning}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          {/* Right Arrow */}
          <button className="arrow right-arrow" onClick={nextWord}>→</button>
        </div>

        {/* Bottom Placeholder (for future use) */}
        <div className="bottom-placeholder"></div>

      </main>

      {/* User Profile Section */}
    </div>
  );
};

export default VocabularyPage;