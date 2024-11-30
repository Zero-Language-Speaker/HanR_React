import React from 'react';
import './WordModal.css';

const WordModal = ({ isOpen, word, meanings, onClose, onLearningMission }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{word}</h2>
        {meanings.map((meaning, index) => (
          <div key={index} className="meaning-section">
            <h3>Definition {index + 1}:</h3>

            <p>{meaning.definition}</p>

            <button onClick={() => onLearningMission(word, meaning.definition)}>
                    Learning Mission
                  </button>


            <h4>Examples:</h4>
            <ul>
              {meaning.examples.map((example, exIndex) => (
                <li key={exIndex}>
                  {example}

                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default WordModal;