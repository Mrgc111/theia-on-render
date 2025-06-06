#!/bin/sh

# APIサーバーを起動
echo "Starting Claude Code API Server..."
cd /home/project
node api-server.js &
API_PID=$!

# Claude APIサーバーを起動
echo "Starting Claude API Server..."
node claude-api-server.js &
CLAUDE_PID=$!

# プロセス終了時のクリーンアップ
cleanup() {
    echo "Stopping services..."
    kill $API_PID $CLAUDE_PID 2>/dev/null
    exit 0
}

trap cleanup SIGTERM SIGINT

# Theiaを起動（フォアグラウンドで実行）
echo "Starting Theia IDE..."
exec yarn theia start /home/project/workspace --hostname=0.0.0.0 --port=3000