import React from 'react';

const WordExplanationWidget = ({ payload }) => {
  const { word, explanation } = payload;

  return (
    <div>
      <h3>{word}</h3>
      <p>{explanation}</p>
    </div>
  );
};

export default WordExplanationWidget;