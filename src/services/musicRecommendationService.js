import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getTimeOfDay } from '../utils/timeUtils';

export const getRecommendedSongs = async (userId, currentWeather, userTopSongs) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userPatterns = userDoc.data().musicPatterns || {};
    const timeOfDay = getTimeOfDay();
    
    // Get pattern for current time of day
    const patternKey = timeOfDay;
    const pattern = userPatterns[patternKey];
    
    if (!pattern) {
      // Return top songs if no pattern found
      return userTopSongs.slice(0, 10);
    }
    
    // Filter songs based on weather match
    const recommendedSongs = pattern.songs.filter((song) => {
      return pattern.weather === currentWeather || !pattern.weather;
    });
    
    // Combine with user's top songs
    const combined = [...new Set([...recommendedSongs, ...userTopSongs])];
    return combined.slice(0, 50);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export const analyzeListeningPatterns = (listeningHistory) => {
  const patterns = {};
  
  listeningHistory.forEach((entry) => {
    const timeOfDay = getTimeOfDay(entry.timestamp);
    const weatherCondition = entry.weatherCondition;
    
    if (!patterns[timeOfDay]) {
      patterns[timeOfDay] = {};
    }
    
    if (!patterns[timeOfDay][weatherCondition]) {
      patterns[timeOfDay][weatherCondition] = [];
    }
    
    patterns[timeOfDay][weatherCondition].push(entry.song);
  });
  
  return patterns;
};
