#!/bin/bash

cd ~/estate-connect || exit

echo "📦 Installing Capacitor..."
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

echo "⚙️ Initializing Capacitor project..."
npx cap init estate-connect com.yourdomain.estateconnect

echo "🏗️ Building React app..."
npm run build

echo "📁 Copying build to Android..."
npx cap copy

echo "📱 Adding Android platform..."
npx cap add android

echo "🚀 Opening Android Studio..."
npx cap open android

echo "✅ Setup complete! Now you can generate signed APK/AAB in Android Studio."
