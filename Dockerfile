FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache git bash curl

COPY package*.json ./

# npm ci の代わりに npm install を使用
RUN npm install --production --no-optional && \
    npm cache clean --force

COPY . .

RUN mkdir -p /app/workspace

RUN NODE_OPTIONS="--max-old-space-size=6144" npm run build

EXPOSE 3000

CMD ["npm", "start"]