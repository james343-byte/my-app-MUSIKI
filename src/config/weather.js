import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCoords = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${WEATHER_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const getWeatherCondition = (weatherMain) => {
  const conditions = {
    'Clear': 'sunny',
    'Clouds': 'cloudy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'stormy',
    'Snow': 'snowy',
    'Mist': 'foggy',
    'Smoke': 'foggy',
    'Haze': 'hazy',
    'Dust': 'dusty',
    'Fog': 'foggy',
    'Sand': 'sandy',
    'Ash': 'ashy',
    'Squall': 'windy',
    'Tornado': 'tornado',
  };
  return conditions[weatherMain] || 'moderate';
};
