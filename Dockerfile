FROM node:18-alpine

WORKDIR /app

# Pythonとビルドツールを追加
RUN apk add --no-cache \
    git \
    bash \
    curl \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

COPY package*.json ./

# npm install（Pythonが利用可能になった）
RUN npm install --production --no-optional && \
    npm cache clean --force

COPY . .

RUN mkdir -p /app/workspace

# Theiaビルド（メモリ制限付き）
RUN NODE_OPTIONS="--max-old-space-size=6144" npm run build

EXPOSE 3000

CMD ["npm", "start"]