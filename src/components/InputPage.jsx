// src/components/InputPage.js
import React from 'react';

const InputPage = () => {
  return (
    <div className="input-page">
      <div className="input-container">
        <label>Label</label>
        <input type="text" placeholder="Input" />
      </div>
      <div className="input-container">
        <label>Label</label>
        <input type="text" placeholder="Input" />
      </div>
    </div>
  );
};

export default InputPage;