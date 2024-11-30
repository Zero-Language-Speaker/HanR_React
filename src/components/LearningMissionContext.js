import React from 'react';

const LearningMissionContext = React.createContext(null);

export const LearningMissionProvider = ({ children, onStartLearningMission }) => (
  <LearningMissionContext.Provider value={onStartLearningMission}>
    {children}
  </LearningMissionContext.Provider>
);

export const useLearningMission = () => {
  const context = React.useContext(LearningMissionContext);
  if (context === undefined) {
    throw new Error('useLearningMission must be used within a LearningMissionProvider');
  }
  return context;
};