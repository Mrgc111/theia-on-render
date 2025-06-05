#!/bin/bash

# APIサーバーを起動
echo "Starting Claude Code API Server..."
cd /home/project
npm install
node api-server.js &

# Claude APIサーバーを起動
echo "Starting Claude API Server..."
node claude-api-server.js &

# Theiaを起動
echo "Starting Theia IDE..."
yarn theia start /home/project/workspace --hostname=0.0.0.0 --port=3000