#!/bin/bash

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building app..."
npm run build

echo "🚀 Deploying to Vercel..."
vercel --prod --yes

echo "✅ Deployment finished at $(date)"
