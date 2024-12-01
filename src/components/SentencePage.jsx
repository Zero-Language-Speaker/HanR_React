import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { expressAxios } from '../customAxios';
import './SentencePage.css';

const SentencePage = () => {
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSentence, setNewSentence] = useState({ text: '', translation: '' });
  const [clickedWord, setClickedWord] = useState(null);
  const [addedWords, setAddedWords] = useState(new Set());
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    fetchSentences();
  }, []);

  const fetchSentences = async () => {
    try {
      setIsLoading(true);
      const response = await expressAxios.get('/api/sentences');
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
        const response = await expressAxios.post('/api/sentences', newSentence);
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

  const handleAddWord = async () => {
    if (!clickedWord) return;
  
    try {
      const response = await expressAxios.post('/api/words', {
        word: clickedWord.word,
        meaning: 'Placeholder meaning'
      });
      console.log('Word added successfully:', response.data);
      setAddedWords(prev => new Set(prev).add(clickedWord.word));
      setClickedWord(null);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };
  const handleCloseWordInfo = () => {
    setClickedWord(null);
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
        ) : sentences.length > 0 && sentences[currentIndex] ? (
          <div className="sentence-display">
            <p className="sentence-text">
              {sentences[currentIndex].text.split(' ').map((word, index) => (
                <span 
                  key={index} 
                  onClick={() => handleWordClick(word)}
                  className={`clickable-word ${addedWords.has(word) ? 'added-word' : ''}`}
                >
                  {word}
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
          <button className="close-btn" onClick={handleCloseWordInfo}>&times;</button>
          <h3>{clickedWord.word}</h3>
          <p>{clickedWord.info}</p>
          <button className="add-word-btn" onClick={handleAddWord}>단어장에 추가하기</button>
        </div>
      )}
      {showFeedback && (
        <div className="feedback-message">
          단어장에 추가되었습니다
        </div>
      )}
        <div className="add-sentence-form">
          <input
            type="text"
            value={newSentence.text}
            onChange={(e) => setNewSentence({...newSentence, text: e.target.value})}
            placeholder="문장 입력"
          />
          <input
            type="text"
            value={newSentence.translation}
            onChange={(e) => setNewSentence({...newSentence, translation: e.target.value})}
            placeholder="뜻 입력"
          />
          <button onClick={addSentence}>문장 추가하기</button>
        </div>
      </main>
    </div>
  );
};

export default SentencePage;