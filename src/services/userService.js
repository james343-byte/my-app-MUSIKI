import { db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      uid: userId,
      phoneNumber: userData.phoneNumber,
      name: userData.name,
      location: userData.location,
      createdAt: new Date(),
      learningPhaseStartDate: new Date(),
      subscriptionStatus: 'free_trial',
      adsFree: false,
      spotifyConnected: false,
      musicPatterns: {},
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    await updateDoc(doc(db, 'users', userId), updates);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const saveMusicPattern = async (userId, pattern) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const currentPatterns = userDoc.data().musicPatterns || {};
    
    await updateDoc(doc(db, 'users', userId), {
      musicPatterns: {
        ...currentPatterns,
        [pattern.timeOfDay]: {
          songs: pattern.songs,
          weather: pattern.weather,
          timestamp: new Date(),
        },
      },
    });
  } catch (error) {
    console.error('Error saving music pattern:', error);
    throw error;
  }
};
