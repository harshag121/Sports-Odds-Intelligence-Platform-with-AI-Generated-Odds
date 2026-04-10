FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV PYTHON_SERVICE_URL=https://sports-odds-ai.fly.dev

EXPOSE 3000

CMD ["node", "dist/server.js"]
