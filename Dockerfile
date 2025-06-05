FROM node:18-alpine

WORKDIR /app

# 基本パッケージのみ
RUN apk add --no-cache git bash

COPY package*.json ./

# 確実にCLIをインストール
RUN npm install --production --no-optional --ignore-scripts && \
    npm install -g @theia/cli && \
    npm cache clean --force

COPY . .

RUN mkdir -p /app/workspace

EXPOSE 3000

# より確実な起動方法
CMD ["theia", "start", "--hostname=0.0.0.0", "--port=3000", "/app/workspace"]