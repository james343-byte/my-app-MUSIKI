import axios from 'axios';

const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getWeatherByCoords = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_BASE}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return {
      temp: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      description: response.data.weather[0].description,
      location: response.data.name,
      country: response.data.sys.country,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const getWeatherForecast = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${WEATHER_API_BASE}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return response.data.list.slice(0, 8); // Next 24 hours (8 x 3-hour intervals)
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const getWeatherConditionType = (weatherMain) => {
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

export const getWeatherEmoji = (condition) => {
  const emojis = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    stormy: '⛈️',
    snowy: '❄️',
    foggy: '🌫️',
    hazy: '🌤️',
    dusty: '💨',
    sandy: '🌊',
    ashy: '🌪️',
    windy: '💨',
    tornado: '🌪️',
    moderate: '🌤️',
  };
  return emojis[condition] || '🌤️';
};
