FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache git bash curl

COPY package*.json ./

RUN npm ci --only=production --no-optional && \
    npm cache clean --force

COPY . .

RUN mkdir -p /app/workspace

RUN NODE_OPTIONS="--max-old-space-size=6144" npm run build

EXPOSE 3000

CMD ["npm", "start"]