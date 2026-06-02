FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci --omit=dev

EXPOSE 3000

# 🔥 On force le WORKDIR juste avant le run
WORKDIR /app

CMD ["sh", "-c", "npm run db:reset && node index.js"]
