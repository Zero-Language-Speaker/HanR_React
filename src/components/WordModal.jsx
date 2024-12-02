import React from 'react';
import './WordModal.css';
import { useLearningMission } from './LearningMissionContext';

const WordModal = ({ isOpen, word, meanings, onClose, onStartLearningMission }) => {

  //const onStartLearningMission = useLearningMission();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose}>Close</button>
        </div>
        <h2>{word}</h2>
        {meanings.map((meaning, index) => (
          <div key={index} className="meaning-section">
            <h3>뜻 {index + 1} :</h3>
            <p>{meaning.definition}</p>
            <h4>예문 :</h4>
            <ul>
              {meaning.examples.map((example, exIndex) => (
                <li key={exIndex}>{example}</li>
              ))}
            </ul>
            <button onClick={() => onStartLearningMission(word, meaning)}>
              학습 미션 시작
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordModal;