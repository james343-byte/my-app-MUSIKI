export const getTimeOfDay = (timestamp = new Date()) => {
  const hours = new Date(timestamp).getHours();
  
  if (hours >= 5 && hours < 12) return 'morning';
  if (hours >= 12 && hours < 17) return 'afternoon';
  if (hours >= 17 && hours < 21) return 'evening';
  return 'night';
};

export const getDaysSinceLearningPhase = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isInLearningPhase = (startDate) => {
  return getDaysSinceLearningPhase(startDate) <= 30;
};

export const getPercentageInLearningPhase = (startDate) => {
  const days = getDaysSinceLearningPhase(startDate);
  return Math.min((days / 30) * 100, 100);
};
