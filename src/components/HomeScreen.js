import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { getWeatherByCoords, getWeatherCondition } from '../config/weather';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { isInLearningPhase, getPercentageInLearningPhase } from '../utils/timeUtils';
import { getWeatherColor, getWeatherIcon } from '../utils/weatherUtils';
import { auth } from '../config/firebase';

const HomeScreen = ({ navigation, route }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [learningProgress, setLearningProgress] = useState(0);

  useEffect(() => {
    loadUserData();
    getLocationAndWeather();
  }, []);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        
        if (isInLearningPhase(profile.learningPhaseStartDate)) {
          const progress = getPercentageInLearningPhase(
            profile.learningPhaseStartDate
          );
          setLearningProgress(progress);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user profile');
    }
  };

  const getLocationAndWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const weatherData = await getWeatherByCoords(
        loc.coords.latitude,
        loc.coords.longitude
      );
      setWeather(weatherData);

      // Update user location in database
      if (userProfile && auth.currentUser) {
        await updateUserProfile(auth.currentUser.uid, {
          location: {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            locality: weatherData.name,
          },
        });
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  const weatherCondition = weather
    ? getWeatherCondition(weather.weather[0].main)
    : 'moderate';
  const weatherColor = getWeatherColor(weatherCondition);
  const weatherIcon = getWeatherIcon(weatherCondition);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.userName}>{userProfile?.name || 'User'}</Text>
          <Text style={styles.userLocation}>
            {userProfile?.location?.locality || 'Fetching location...'}
          </Text>
        </View>
        <View
          style={[
            styles.weatherCircle,
            { backgroundColor: weatherColor, borderColor: weatherColor },
          ]}
        >
          <Text style={styles.weatherIcon}>{weatherIcon}</Text>
          <Text style={styles.temperature}>
            {Math.round(weather?.main?.temp || 0)}°C
          </Text>
        </View>
      </View>

      {/* Learning Phase Progress */}
      {isInLearningPhase(userProfile?.learningPhaseStartDate) && (
        <View style={styles.learningPhaseContainer}>
          <Text style={styles.learningPhaseText}>
            Learning Phase: Day {Math.ceil(learningProgress / 3)}/30
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${learningProgress}%`,
                  backgroundColor: weatherColor,
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Now Playing Section */}
      <View style={styles.nowPlayingContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/200' }}
          style={[styles.albumArt, { borderColor: weatherColor }]}
        />
        <Text style={styles.songName}>Sample Song Title</Text>
        <Text style={styles.artistName}>Sample Artist</Text>
        <Text style={styles.duration}>3:45 / 5:00</Text>
      </View>

      {/* Spotify Connect */}
      {!userProfile?.spotifyConnected && (
        <TouchableOpacity
          style={styles.spotifyButton}
          onPress={() => navigation.navigate('SpotifyAuth')}
        >
          <Text style={styles.spotifyButtonText}>
            🎵 Link Spotify Account
          </Text>
        </TouchableOpacity>
      )}

      {/* Player Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏮️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.playButton]}>
          <Text style={styles.controlIcon}>▶️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏭️</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Indicators */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🎵</Text>
          <Text style={styles.navLabel}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Subscription')}
        >
          <Text style={styles.navIcon}>💳</Text>
          <Text style={styles.navLabel}>Plans</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  weatherCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  weatherIcon: {
    fontSize: 40,
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  learningPhaseContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  learningPhaseText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  nowPlayingContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 3,
  },
  songName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  artistName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  duration: {
    fontSize: 12,
    color: '#999',
  },
  spotifyButton: {
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: '#1DB954',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  spotifyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 70,
    height: 70,
    backgroundColor: '#1DB954',
  },
  controlIcon: {
    fontSize: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
