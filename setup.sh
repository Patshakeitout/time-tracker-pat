#!/usr/bin/env bash

# Set project root folder
echo "Creating project folders..."
mkdir time-tracker-pat && cd time-tracker-pat

# Backend: Laravel install
echo "Installing Laravel backend..."
composer create-project laravel/laravel backend

# Frontend: Vite React + TS
echo "Setting up React frontend..."
cd backend && cd ..
mkdir frontend && cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled sass

# Return to root and initialize Git
echo "Initializing Git..."
cd ..
git init

echo "Done."