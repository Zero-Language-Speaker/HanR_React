import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { expressAxios } from '../customAxios';
import './WordLearningPage.css';

const WordLearningPage = () => {
  const [randomWord, setRandomWord] = useState(null);
  const [userExplanation, setUserExplanation] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    try {
      const response = await expressAxios.get('/api/random-word');
      setRandomWord(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching random word:', error);
      setError('Failed to fetch random word. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Word:', randomWord.word);
    console.log('User Explanation:', userExplanation);
    setUserExplanation('');
    fetchRandomWord();
  };

  return (
    <div className="word-learning-page">
      <h2>단어 학습</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : randomWord ? (
        <div className="word-learning-container">
          <div className="word-display">
            <h3>{randomWord.word}</h3>
            {randomWord.meaning && <p className="word-meaning blurred">{randomWord.meaning}</p>}
          </div>
          <form onSubmit={handleSubmit} className="explanation-form">
            <textarea
              value={userExplanation}
              onChange={(e) => setUserExplanation(e.target.value)}
              placeholder="단어의 뜻을 설명하세요"
              rows="4"
            />
            <button type="submit" className="submit-btn">제출</button>
          </form>
          <button onClick={fetchRandomWord} className="next-word-btn">랜덤 단어</button>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default WordLearningPage;