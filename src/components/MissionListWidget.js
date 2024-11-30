import React from 'react';

const MissionListWidget = ({ payload }) => {
  const { word, meaning, missions } = payload;

  return (
    <div>
      <h3>Missions for "{word}" (Meaning: {meaning})</h3>
      <ul>
        {missions.map((mission, index) => (
          <li key={index}>{mission}</li>
        ))}
      </ul>
    </div>
  );
};

export default MissionListWidget;
