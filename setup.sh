#!/usr/bin/env bash
# Creates folder structure for Time Tracker project

# Backend directories
mkdir -p backend/app/Http/Controllers
mkdir -p backend/routes
mkdir -p backend/storage

# Frontend directories
mkdir -p frontend/public
mkdir -p frontend/src/services
mkdir -p frontend/src/components
mkdir -p frontend/src/styles

echo "Project directories created."
