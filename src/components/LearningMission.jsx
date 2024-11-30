import React from 'react';

const LearningMission = ({ message }) => {
  const { word, definition, example } = message;
  return (
    <div className="learning-mission">
      <h3>Learning Mission for "{word}"</h3>
      <p><strong>Definition:</strong> {definition}</p>
      <p><strong>Example:</strong> {example}</p>
      <p>How would you use this word in a sentence?</p>
    </div>
  );
};

export default LearningMission;