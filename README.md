# MUSIKI - Weather-Aware Music Streaming App

## Overview
MUSIKI is an innovative mobile app that combines Spotify integration, real-time weather data, and machine learning to deliver personalized music recommendations based on your location, time of day, and weather conditions.

## Features

### Core Features
- 🎵 Spotify Integration - Link your Spotify account for seamless music streaming
- 🌤️ Weather-Based Recommendations - Music suggestions based on current weather
- ⏰ Time-Aware Playlists - Different recommendations for morning, afternoon, evening, and night
- 📍 Location-Based Personalization - Recommendations vary by locality
- 📊 Learning Phase - 30-day learning period to understand your music preferences

### User Features
- 📱 Phone Number Login (OTP via WhatsApp/SMS)
- 👤 User Profiles with Spotify integration
- 🎧 Search and Browse - Find songs from your recent listening history
- 💳 Flexible Subscription Plans
- 🎁 Free Trial - 30 days of ad-supported access during learning phase

### Payment & Subscription
- Multiple payment methods: UPI, FamPay
- Combined and Individual subscription plans
- Ad-free options available

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Firestore, Authentication)
- **APIs**: 
  - Spotify Web API
  - OpenWeatherMap API
  - Razorpay Payment Gateway
- **Geolocation**: Expo Location

## Project Structure

```
my-app-MUSIKI/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.js
│   │   ├── HomeScreen.js
│   │   └── ...
│   ├── config/
│   │   ├── firebase.js
│   │   ├── spotify.js
│   │   └── weather.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── musicRecommendationService.js
│   │   └── subscriptionService.js
│   ├── utils/
│   │   ├── timeUtils.js
│   │   └── weatherUtils.js
│   └── App.js
├── app.json
├── package.json
├── .env.example
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/james343-byte/my-app-MUSIKI.git
cd my-app-MUSIKI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Fill in your API keys
```

4. Start the development server:
```bash
npm start
```

## Environment Variables

Create a `.env` file with the following:

```
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## API Integration

### Spotify API
- Requires OAuth 2.0 authentication
- Used for accessing user's listening history and playlists
- Scopes: user-read-private, user-top-read, playlist-read-private

### OpenWeatherMap API
- Provides real-time weather data
- Used with geolocation to fetch weather conditions

### Firebase
- Authentication: Phone-based OTP
- Database: Firestore for storing user profiles, patterns, and subscriptions

### Razorpay
- Payment processing for subscriptions
- Supports UPI and FamPay

## Subscription Plans

### Combined Plans (with Ads-Removal Option)
- 29 Days - ₹90 (₹110 with ads removal)
- 85 Days - ₹263 (₹300 with ads removal)
- 360 Days - ₹1050 (₹1150 with ads removal)

### Individual Plans
- 30 Days - ₹100
- 90 Days - ₹283
- 360 Days - ₹1111

## Learning Phase

- **Duration**: 30 days
- **Cost**: Free with ads (after initial 30-day learning phase)
- **Purpose**: App learns your music preferences, time-of-day habits, and weather correlations
- **Data Collection**: Spotify listening history + in-app activity

## Getting Started

### For Development
1. Follow Installation steps above
2. Create Firebase project and get credentials
3. Register Spotify app and get Client ID/Secret
4. Get OpenWeatherMap API key
5. Get Razorpay credentials
6. Update .env file with all credentials

### For Publishing

#### Android (Google Play)
1. Generate a production build
2. Sign the APK with your keystore
3. Upload to Google Play Console

#### iOS (App Store)
1. Create Apple Developer account
2. Generate certificates and provisioning profiles
3. Build and archive the app
4. Submit to App Store

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and commercial purposes.

## Support

For issues and questions, please open a GitHub issue.

## Roadmap

- [ ] Complete Authentication UI
- [ ] Spotify Integration
- [ ] Music Player Implementation
- [ ] Search and Browse Interface
- [ ] Subscription Payment Integration
- [ ] Admin Dashboard
- [ ] Analytics and Reporting
- [ ] Push Notifications
- [ ] Offline Mode
- [ ] Social Features

## Contact

For inquiries, contact: james343-byte@github.com
