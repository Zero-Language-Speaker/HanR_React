// SentencePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SentencePage.css';

const SentencePage = () => {
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSentences();
  }, []);

  const fetchSentences = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3001/api/sentences');
      setSentences(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching sentences:', err);
      setError('Failed to load sentences. Please try again later.');
      setIsLoading(false);
    }
  };

  const nextSentence = () => {
    if (sentences.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }
  };

  const prevSentence = () => {
    if (sentences.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + sentences.length) % sentences.length);
    }
  };

  const getRandomSentence = () => {
    if (sentences.length > 0) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setCurrentIndex(randomIndex);
    }
  };

  return (
    <div className="sentence-page">
      <main className="main-content">
        <div className="top-buttons">
          <button className="recommend-btn" onClick={getRandomSentence}>오늘의 추천 문장</button>
          <button className="review-btn" onClick={getRandomSentence}>오늘의 복습 문장</button>
        </div>

        <div className="sentence-display-section">
          <button className="arrow left-arrow" onClick={prevSentence}>←</button>
          
          {sentences.length > 0 ? (
            <div className="sentence-display">
              <p className="sentence-text">{sentences[currentIndex].text}</p>
              <p className="sentence-translation">{sentences[currentIndex].translation}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          
          <button className="arrow right-arrow" onClick={nextSentence}>→</button>
        </div>
      </main>
    </div>
  );
};

export default SentencePage;