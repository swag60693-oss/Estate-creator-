#!/bin/bash

# Navigate to project folder
cd ~/estate-connect || exit

# Add changes to git
git add .

# Commit with message
git commit -m "Auto deploy $(date +'%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push origin main

# Deploy to Vercel (NkSkjRXc3eUHIMUCHaH8HgfO )
vercel --prod --toke
NkSkjRXc3eUHIMUCHaH8HgfO
n YOUR_TOKEN
