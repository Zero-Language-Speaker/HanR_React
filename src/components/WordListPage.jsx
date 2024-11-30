import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WordListPage.css';
import { useWordModal } from './useWordModal';
import WordModal from './WordModal';

const WordListPage = ({ setChatbotInput }) => {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newMeanings, setNewMeanings] = useState([{ definition: '', examples: [''] }]);
  const { isModalOpen, selectedWord, openModal, closeModal, updateSelectedWord } = useWordModal();

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get('/api/words');
      const sortedWords = response.data.sort((a, b) => b.id - a.id);
      setWords(sortedWords);
    } catch (error) {
      console.error('Error fetching words:', error.message);
    }
  };

  const addWord = async () => {
    if (!newWord || newMeanings.some(m => !m.definition)) return;

    try {
      const existingWordIndex = words.findIndex(w => w.word.toLowerCase() === newWord.toLowerCase());

      if (existingWordIndex !== -1) {
        // Word exists, update meanings
        await updateWord(words[existingWordIndex].id, newWord, newMeanings);
      } else {
        // New word, add it
        const response = await axios.post('/api/words', {
          word: newWord,
          meanings: newMeanings
        });
        setWords([response.data, ...words]);
      }

      setNewWord('');
      setNewMeanings([{ definition: '', examples: [''] }]);
    } catch (error) {
      console.error('Error adding/updating word:', error);
    }
  };

  const updateWord = async (id, word, newMeanings) => {
    try {
      const existingWord = words.find(w => w.id === id);
      const updatedMeanings = [...existingWord.meanings, ...newMeanings];
      const response = await axios.put(`/api/words/${id}`, {
        word,
        meanings: updatedMeanings
      });
      const updatedWords = words.map(w => w.id === id ? response.data : w);
      setWords(updatedWords);
      
      // Update the selected word if it's currently open in the modal
      if (selectedWord && selectedWord.id === id) {
        updateSelectedWord(response.data);
      }
    } catch (error) {
      console.error('Error updating word:', error);
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

  const addMeaning = () => {
    setNewMeanings([...newMeanings, { definition: '', examples: [''] }]);
  };

  const addExample = (meaningIndex) => {
    const updatedMeanings = [...newMeanings];
    updatedMeanings[meaningIndex].examples.push('');
    setNewMeanings(updatedMeanings);
  };

  const updateMeaning = (index, field, value) => {
    const updatedMeanings = [...newMeanings];
    updatedMeanings[index][field] = value;
    setNewMeanings(updatedMeanings);
  };

  const updateExample = (meaningIndex, exampleIndex, value) => {
    const updatedMeanings = [...newMeanings];
    updatedMeanings[meaningIndex].examples[exampleIndex] = value;
    setNewMeanings(updatedMeanings);
  };

  const handleLearningMission = (word, definition, example) => {
    const missionInput = `Learning mission for "${word}": Definition: ${definition}, Example: ${example}`;
    setChatbotInput(missionInput);
    closeModal();
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
        {newMeanings.map((meaning, meaningIndex) => (
          <div key={meaningIndex} className="meaning-input">
            <input
              type="text"
              placeholder="뜻 입력"
              value={meaning.definition}
              onChange={(e) => updateMeaning(meaningIndex, 'definition', e.target.value)}
            />
            {meaning.examples.map((example, exampleIndex) => (
              <input
                key={exampleIndex}
                type="text"
                placeholder="예문 입력"
                value={example}
                onChange={(e) => updateExample(meaningIndex, exampleIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
        <button onClick={addWord}>단어 추가</button>
      </div>

      <WordModal
        isOpen={isModalOpen}
        word={selectedWord?.word}
        meanings={selectedWord?.meanings || []}
        onClose={closeModal}
        onLearningMission={handleLearningMission}
      />

      <div className="word-card-container">
        {words.map((item) => (
          <div key={item.id} className="word-card">
            <h3 onClick={() => openModal(item)} style={{ cursor: 'pointer' }}>{item.word}</h3>
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