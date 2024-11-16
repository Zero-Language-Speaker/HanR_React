import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WordListPage.css';

const WordListPage = () => {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get('/api/words');
      const sortedWords = response.data.sort((a, b) => b.id - a.id);
      setWords(sortedWords);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const addWord = async () => {
    if (!newWord || !newMeaning) return;

    try {
      const response = await axios.post('/api/words', {
        word: newWord,
        meaning: newMeaning
      });
      setWords([response.data, ...words]);
      setNewWord('');
      setNewMeaning('');
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const deleteWord = async (id) => {
    try {
      await axios.delete(`/api/words/${id}`);
      setWords(words.filter(word => word.id !== id));
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  return (
    <div className="word-list-page">
      <h2>단어 목록</h2>

      <div className="add-word-form">
        <input
          type="text"
          placeholder="단어 입력"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="뜻 입력"
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
        />
        <button onClick={addWord}>추가</button>
      </div>

      <div className="word-card-container">
        {words.map((item) => (
          <div key={item.id} className="word-card">
            <h3>{item.word}</h3>
            <hr className="word-divider" />
            <p>{item.meaning}</p>
            <button className="delete-button" onClick={() => deleteWord(item.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordListPage;