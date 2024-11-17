import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SentencePage.css';

const SentencePage = () => {
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSentence, setNewSentence] = useState({ text: '', translation: '' });
  const [clickedWord, setClickedWord] = useState(null);

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

  const addSentence = async () => {
    if (newSentence.text && newSentence.translation) {
      try {
        const response = await axios.post('http://localhost:3001/api/sentences', newSentence);
        setSentences([...sentences, response.data]);
        setNewSentence({ text: '', translation: '' });
      } catch (err) {
        console.error('Error adding sentence:', err);
      }
    }
  };

  const getRandomSentence = () => {
    if (sentences.length > 0) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setCurrentIndex(randomIndex);
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

  const handleWordClick = (word) => {
    setClickedWord({
      word: word,
      info: `Placeholder information for "${word}". This will be replaced with actual word information in the future.`
    });
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
          
          {isLoading ? (
            <p>Loading...</p>
          ) : sentences.length > 0 ? (
            <div className="sentence-display">
              <p className="sentence-text">
                {sentences[currentIndex].text.split(' ').map((word, index) => (
                  <span 
                    key={index} 
                    className="clickable-word" 
                    onClick={() => handleWordClick(word)}
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>
              <p className="sentence-translation">{sentences[currentIndex].translation}</p>
            </div>
          ) : (
            <p>No sentences available.</p>
          )}
          
          <button className="arrow right-arrow" onClick={nextSentence}>→</button>
        </div>

        {clickedWord && (
          <div className="word-info">
            <h3>{clickedWord.word}</h3>
            <p>{clickedWord.info}</p>
          </div>
        )}

        <div className="add-sentence-form">
          <input
            type="text"
            value={newSentence.text}
            onChange={(e) => setNewSentence({...newSentence, text: e.target.value})}
            placeholder="Enter sentence"
          />
          <input
            type="text"
            value={newSentence.translation}
            onChange={(e) => setNewSentence({...newSentence, translation: e.target.value})}
            placeholder="Enter translation"
          />
          <button onClick={addSentence}>Add Sentence</button>
        </div>
      </main>
    </div>
  );
};

export default SentencePage;