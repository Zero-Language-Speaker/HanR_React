import React, { useState, useEffect } from 'react';
import { expressAxios, fastapiAxios } from '../customAxios';
import './ExplainPage.css';

const ExplainPage = () => {
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [sentence, setSentence] = useState("")
  const [isWriting, setIsWriting] = useState(true)
  const [result, setResult] = useState([])

  const onClickCheck = async () => {
    setIsWriting(false)
    try{
      setIsLoading(true)
      const response = await fastapiAxios.post("/api/word_explain", {
        text: sentence
      })
      console.log("onClickCheck:", response.data)
      setResult(response.data)
      setIsLoading(false)
    } catch (err){
      console.log("Error onClickCheck:", err)
      setIsLoading(false)
      setIsWriting(true)
    }
  }

  const addWord = async (item) => {
    console.log("addWord:", item)
    try {
      const response = await expressAxios.post('/api/words', {
        word: item.word,
        meanings: [{
          definition: item.meaning,
          examples: item.example_sentence
        }]
      });
      console.log('Word added successfully:', item.word);
    } catch (err) {
      console.log("Failed to add word:", item.word, err)
    }
  }

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
          <textarea
            className="sentence-text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            rows={5} // Adjust the number of rows as needed
            style={{ width: '100%' }} // Ensures the textarea takes full width of its container
          />
        </div>

        <button onClick={onClickCheck}>확인</button>

      <div className='word-info-container'>
          {isLoading? <div className="word-info" style={{textAlign: "center"}}>Loading...</div> : result.map((item)=>
          <div className="word-info">
            <h3>{item.word}</h3>
            <div><strong>의미:</strong> {item.meaning}</div>
            <div><strong>예문:</strong> {item.example_sentence}</div>
            <button className="add-word-btn" onClick={() => addWord(item)}>단어장에 추가하기</button>
          </div>
        )}
      </div>
      </main>
    </div>
  );
};

export default ExplainPage;