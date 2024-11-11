// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, word, meaning }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{word}</h2>
        <p>{meaning}</p>
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
