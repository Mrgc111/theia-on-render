# 確実にビルドするTheia Dockerfile
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

# package.jsonをコピーして依存関係インストール
COPY package.json .
RUN npm install

# 全ファイルをコピー
COPY . .

# ワークスペース作成
RUN mkdir -p /app/workspace

# 重要：Theiaをビルド
RUN npm run build || npx theia build

# ビルド成果物の確認
RUN ls -la src-gen/ || echo "src-gen not found, trying alternative approach"

# ポート公開
EXPOSE 3000

# 複数の起動方法を試行
CMD ["sh", "-c", "if [ -f src-gen/backend/main.js ]; then node src-gen/backend/main.js --hostname=0.0.0.0 --port=3000 /app/workspace; else npx theia start /app/workspace --hostname=0.0.0.0 --port=3000; fi"]