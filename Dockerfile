FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY uploads ./uploads
COPY . .

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["sh", "-c", "npx sequelize db:migrate && npx sequelize db:seed:all && node index.js"]
