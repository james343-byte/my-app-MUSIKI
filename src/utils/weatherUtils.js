export const getWeatherColor = (condition) => {
  const colorMap = {
    sunny: '#FFD700',
    cloudy: '#D3D3D3',
    rainy: '#4A4E69',
    stormy: '#2C2C54',
    snowy: '#F0F8FF',
    foggy: '#A9A9A9',
    hazy: '#BDB76B',
    dusty: '#D2B48C',
    sandy: '#EDC9AF',
    ashy: '#696969',
    windy: '#87CEEB',
    tornado: '#8B4513',
    moderate: '#F5DEB3',
  };
  return colorMap[condition] || '#F5DEB3';
};

export const getWeatherIcon = (condition) => {
  const iconMap = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    stormy: '⛈️',
    snowy: '❄️',
    foggy: '🌫️',
    hazy: '🌤️',
    dusty: '💨',
    sandy: '🌪️',
    ashy: '🌋',
    windy: '💨',
    tornado: '🌪️',
    moderate: '🌤️',
  };
  return iconMap[condition] || '🌤️';
};
