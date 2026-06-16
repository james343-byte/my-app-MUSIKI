# 🎵 MUSIKI - Complete API Setup & Deployment Guide

## ✅ STEP 1: GET ALL API KEYS (Required)

### 1. **Spotify API** (Music Data)
**Time: 5 minutes**

1. Go to: https://developer.spotify.com/dashboard
2. Log in (create account if needed)
3. Click "Create an App"
4. Fill form:
   - App name: `MUSIKI`
   - Accept terms → Create
5. Copy:
   - **Client ID**: `YOUR_SPOTIFY_CLIENT_ID`
   - **Client Secret**: `YOUR_SPOTIFY_CLIENT_SECRET`

**Save this:**
```
SPOTIFY_CLIENT_ID=<paste here>
SPOTIFY_CLIENT_SECRET=<paste here>
SPOTIFY_REDIRECT_URI=https://musiki-app.com/callback
```

---

### 2. **OpenWeatherMap API** (Weather Data)
**Time: 5 minutes**

1. Go to: https://openweathermap.org/api
2. Click "Sign Up"
3. Create account
4. Go to: https://home.openweathermap.org/api_keys
5. Copy your **API Key**: `YOUR_WEATHER_API_KEY`

**Save this:**
```
WEATHER_API_KEY=<paste here>
```

---

### 3. **Firebase** (Database & Authentication)
**Time: 15 minutes**

1. Go to: https://console.firebase.google.com
2. Click "Create Project"
3. Fill:
   - Name: `MUSIKI`
   - Region: Select your country
   - Accept → Create
4. Wait for project creation (2-3 min)
5. Go to **Settings** ⚙️ → **Project Settings**
6. Copy all values:

**Save this:**
```
FIREBASE_API_KEY=<paste here>
FIREBASE_AUTH_DOMAIN=<paste here>.firebaseapp.com
FIREBASE_PROJECT_ID=<paste here>
FIREBASE_STORAGE_BUCKET=<paste here>.appspot.com
FIREBASE_MESSAGING_SENDER_ID=<paste here>
FIREBASE_APP_ID=<paste here>
```

**Also enable Phone Auth:**
- Go to **Authentication**
- Click **Sign-in method**
- Enable **Phone**
- Add your app

---

### 4. **Razorpay** (Payment Gateway - UPI/FamPay)
**Time: 20 minutes (needs verification)**

1. Go to: https://razorpay.com
2. Click "Sign Up"
3. Fill:
   - Email
   - Phone (Indian number needed)
   - Business name: `MUSIKI`
4. Verify OTP
5. Complete KYC verification (takes 1-2 hours)
6. Once verified:
   - Go to **Dashboard**
   - Click **Settings** ⚙️
   - Go to **API Keys**
   - Copy **Key ID**: `YOUR_RAZORPAY_KEY_ID`

**Save this:**
```
RAZORPAY_KEY_ID=<paste here>
```

---

## ✅ STEP 2: Create `.env` File

Create a file named `.env` in your project root with all keys:

```env
# Spotify
REACT_APP_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
REACT_APP_SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
REACT_APP_SPOTIFY_REDIRECT_URI=https://musiki-app.com/callback

# Weather
REACT_APP_WEATHER_API_KEY=YOUR_WEATHER_API_KEY

# Firebase
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

# Razorpay
REACT_APP_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
```

---

## ✅ STEP 3: Test the App Locally

```bash
cd my-app-MUSIKI
npm install
npm start
```

Press `w` for Web → Test all features with real APIs!

---

## ✅ STEP 4: Deploy to App Store (iOS)

### Prerequisites:
- Mac computer
- Apple Developer Account ($99/year)
- Xcode installed

### Steps:

1. **Create Apple Developer Account**
   - Go to: https://developer.apple.com
   - Sign up → Pay $99
   - Wait for approval (24 hours)

2. **Build for iOS**
   ```bash
   npm run build-ios
   ```

3. **Archive & Sign**
   - Open in Xcode
   - Product → Archive
   - Sign with your certificate

4. **Submit to App Store**
   - Open App Store Connect
   - Create new app
   - Upload binary
   - Fill app details:
     - Name: MUSIKI
     - Description: Weather-aware music streaming
     - Screenshots (3-5 images)
     - Category: Music
     - Keywords: music, streaming, weather
     - Privacy Policy URL
     - Support URL
   - Submit for review

5. **Wait for Apple Review**
   - Usually 24-48 hours
   - Once approved → Live on App Store!

---

## ✅ STEP 5: Deploy to Google Play (Android)

### Prerequisites:
- Android Developer Account ($25 one-time)
- Android Studio installed

### Steps:

1. **Create Google Play Account**
   - Go to: https://play.google.com/console
   - Sign up → Pay $25
   - Create developer account

2. **Build for Android**
   ```bash
   npm run build-android
   ```

3. **Generate Signing Key**
   ```bash
   keytool -genkey -v -keystore musiki.jks -keyalg RSA -keysize 2048 -validity 10000 -alias musiki
   ```
   - Password: `your_secure_password`
   - Save `musiki.jks` safely!

4. **Sign the APK**
   - Use the generated key
   - Create production build

5. **Create App on Google Play Console**
   - Click "Create App"
   - Fill:
     - App name: MUSIKI
     - Default language: English
     - App category: Music & Audio
     - App type: Games/Music
     - Content rating: Fill questionnaire
     - Privacy policy
     - Target audience

6. **Upload Build**
   - Go to **Release** → **Production**
   - Upload your signed APK/AAB

7. **Fill Store Listing**
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 PNG)
   - Screenshots (5 images, 1080x1920 PNG)
   - Short description (50 chars)
   - Full description (4000 chars)
   - Category, rating, etc.

8. **Submit for Review**
   - Click "Submit app for review"
   - Google reviews within 24-48 hours
   - Once approved → Live on Google Play!

---

## 📸 Screenshots You'll Need

Create 5 screenshots showing:
1. **Welcome Screen** - Login
2. **Home Screen** - Weather & music player
3. **Search Screen** - Browse songs
4. **Plans Screen** - Subscriptions
5. **Payment Screen** - UPI/FamPay

Size: **1080x1920 pixels** (PNG format)

---

## 📝 App Store Information

### Title
```
MUSIKI - Weather Music Player
```

### Subtitle (iOS)
```
Your weather-aware music companion
```

### Short Description (50 characters)
```
Weather-aware music streaming with Spotify
```

### Full Description (4000 characters max)
```
MUSIKI is a revolutionary music streaming app that combines Spotify integration with real-time weather data to deliver personalized music recommendations.

🎵 FEATURES:
✅ Spotify Integration - Access your favorite songs
✅ Weather-Based Recommendations - Music based on current weather
✅ Time-Aware Playlists - Different recommendations for morning/afternoon/evening/night
✅ Learning Phase - App learns your music preferences over 30 days
✅ Smart Recommendations - AI-powered music suggestions
✅ Flexible Subscriptions - Multiple plans available
✅ UPI & FamPay Support - Easy payments

💰 PRICING:
• 29 Days - ₹90 (with ads removal option)
• 85 Days - ₹263 (with ads removal option)
• 360 Days - ₹1050 (with ads removal option)

📍 LOCATION-BASED:
Your location determines weather conditions for recommendations.

🔐 PRIVACY:
Your data is encrypted and never shared with third parties.

Download MUSIKI today and experience music like never before!
```

### Keywords
```
music, streaming, spotify, weather, playlist, radio, songs
```

### Category
```
Music
```

### Content Rating
```
12+ (for some song content)
```

---

## 🎯 Checklist Before Submission

- [ ] All API keys are valid and working
- [ ] .env file is configured correctly
- [ ] App tested locally without errors
- [ ] All screens work properly
- [ ] Spotify login works
- [ ] Weather displays correctly
- [ ] Payments can be initiated
- [ ] Privacy policy written
- [ ] Screenshots created (5 images)
- [ ] App icon designed (512x512)
- [ ] Feature graphic created (1024x500)
- [ ] App name finalized
- [ ] Description written
- [ ] Keywords selected

---

## 💪 After Submission

1. **iOS App Store**
   - Review time: 24-48 hours
   - Once approved: Available immediately
   - URL: https://apps.apple.com/app/musiki

2. **Google Play Store**
   - Review time: 24-48 hours
   - Once approved: Available immediately
   - URL: https://play.google.com/store/apps/details?id=com.musiki.app

---

## 🆘 Troubleshooting

### App rejected by Apple
- Common reason: Doesn't differ from other music apps
- Solution: Highlight unique weather-based features

### App rejected by Google
- Common reason: Privacy policy issues
- Solution: Clear privacy policy required

### APIs not working
- Check all keys in .env file
- Verify internet connection
- Check API rate limits

---

## 📞 Support During Review

**If your app is rejected:**
1. Read the rejection reason carefully
2. Fix the issue
3. Resubmit
4. Repeat until approved

Most rejections are fixable!

---

## 🎉 Success!

Once your app is live:

✅ Share link with friends
✅ Ask for reviews on App Store
✅ Market on social media
✅ Update with new features
✅ Fix bugs based on feedback

---

**Total Time to Deploy: 2-3 days** ⏱️
**Total Cost: $99 (Apple) + $25 (Google) = $124** 💰

Good luck! 🚀
