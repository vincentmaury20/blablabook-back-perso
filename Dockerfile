FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


ARG CACHE_BREAK=1

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run db:reset && node index.js"]
