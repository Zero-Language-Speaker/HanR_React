import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { expressAxios, fastapiAxios } from '../customAxios';
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

  const [sentence, setSentence] = useState("그의 갑작스런 결정은 나에게 큰 혼란을 주었다.")
  const [isWriting, setIsWriting] = useState(true)
  const [selectedWords, setSelectedWords] = useState(new Set());
  const [result, setResult] = useState([])

  const handleWordSelect = (word) => {
    setSelectedWords(prevSet => {
      const newSet = new Set(prevSet);
      if (newSet.has(word)) {
        newSet.delete(word);
      } else {
        newSet.add(word);
      }
      return newSet;
    });
  };

  const addWords = async () => {
    try {
      setIsLoading(true);
      const response = await fastapiAxios.post("/api/word_select", {
        words_list: Array.from(selectedWords),
        text: sentence
      })
      setResult(response.data)
      console.log("addWords response:", response.data)
      setIsLoading(false);

      for (const item of response.data){
        try {
          const response = await expressAxios.post('/api/words', {
            word: item.word,
            meanings: [{
              definition: item.meaning,
              examples: [item.example_sentence]
            }]
          });
          console.log('Word added successfully:', item.word);
        } catch (err){
          console.log("Failed to add word:", item.word, err)
        }
      }

      alert("All words added successfully!")
    } catch (err) {
      console.error('Error addWords:', err);
      setIsLoading(false);
      alert("Sorry! An error occured when adding words!")
    }
  }

  const onClickWritingButton = () => {
    if (isWriting) setSelectedWords(new Set());
    setIsWriting(!isWriting);
    console.log("toggle isWriting")
  }

  useEffect(()=>{
    // console.log("selectedWords:", selectedWords)
    console.log("result:", result)
  }, [result]);

  useEffect(() => {
    fetchSentences();
  }, []);

  const fetchSentences = async () => {
    try {
      setIsLoading(true);
      // const response = await expressAxios.get('/api/sentences');
      const response = {data: [{text: "another example 123"}]}
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
        // const response = await expressAxios.post('/api/sentences', newSentence);
        const response = {data: "Dummy sentence 2"}
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

        <h2>문장에서 단어 추가하기</h2>

        <div className="sentence-display-section">
          {isWriting?
            <textarea
              className="sentence-text"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              rows={5} // Adjust the number of rows as needed
              style={{ width: '100%' }} // Ensures the textarea takes full width of its container
            /> :
            <div className="sentence-display">
              <p className="sentence-text">
                {sentence.split(' ').map((word, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      // handleWordClick(word)
                      handleWordSelect(word)
                    }}
                    className={`clickable-word ${selectedWords.has(word) ? 'added-word' : ''}`}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>}
          </div>

      <div style={{ display: "flex", gap: "10px", margin: "10px" }}>
          <button onClick={onClickWritingButton}>{isWriting? "확인": "수정"}</button>
          {isWriting? "": <button onClick={addWords}>단어 추가</button>}
      </div>

      <div className='word-info-container'>
          {isLoading ? <div className="word-info" style={{textAlign: "center"}}>Loading...</div> : result.map((item)=>
          <div className="word-info">
            <h3>{item.word}</h3>
            <div><strong>의미:</strong> {item.meaning}</div>
            <div><strong>예문:</strong> {item.example_sentence}</div>
          </div>
        )}
      </div>

      {/* {clickedWord && (
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
      )} */}
        {/* <div className="add-sentence-form">
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
        </div> */}
      </main>
    </div>
  );
};

export default SentencePage;