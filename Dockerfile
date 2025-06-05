FROM node:18-alpine

WORKDIR /app

# 基本パッケージのみ
RUN apk add --no-cache git bash

COPY package*.json ./

# 問題のあるパッケージを除外してインストール
RUN npm install --production --no-optional --ignore-scripts && \
    npm cache clean --force

COPY . .

RUN mkdir -p /app/workspace

# ビルドをスキップして、直接Theiaを起動
EXPOSE 3000

# 直接Theiaコマンドで起動（ビルド不要）
CMD ["npx", "@theia/cli", "start", "--hostname=0.0.0.0", "--port=3000", "/app/workspace"]