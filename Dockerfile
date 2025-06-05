# 確実に動作するTheia自前ビルド版
FROM node:18-bullseye

WORKDIR /app

# 必要なツールをインストール
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    python3-pip \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Theiaを直接グローバルインストール
RUN npm install -g @theia/cli

# 作業ディレクトリでTheiaアプリケーション作成
COPY package.json .
RUN npm install

# ワークスペース作成
RUN mkdir -p /app/workspace

COPY workspace/ /app/workspace/

# ポート公開
EXPOSE 3000

# Theiaを直接起動（ビルド済みパッケージを使用）
CMD ["npx", "theia", "start", "/app/workspace", "--hostname=0.0.0.0", "--port=3000"]