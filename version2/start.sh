#!/bin/bash

# Civic AI Talent Match - Startup Script
# This script starts a local development server

echo "🎯 Civic AI Talent Match - Version 2"
echo "======================================"
echo ""

# Change to script directory
cd "$(dirname "$0")"

# Check if python3 is available
if command -v python3 &> /dev/null; then
    echo "🚀 Starting server with Python 3..."
    echo "📍 Opening http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000 --bind 127.0.0.1

# Check if python is available
elif command -v python &> /dev/null; then
    echo "🚀 Starting server with Python 2..."
    echo "📍 Opening http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000

# Check if http-server is available
elif command -v http-server &> /dev/null; then
    echo "🚀 Starting server with http-server..."
    echo "📍 Opening http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    http-server -p 8000

# Check if php is available
elif command -v php &> /dev/null; then
    echo "🚀 Starting server with PHP..."
    echo "📍 Opening http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000

else
    echo "❌ Error: No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  • Python (python3 or python)"
    echo "  • Node.js (then: npm install -g http-server)"
    echo "  • PHP"
    echo ""
    echo "Or open index.html directly in your browser"
    exit 1
fi
