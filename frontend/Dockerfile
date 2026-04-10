FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
RUN npm install -g http-server

COPY --from=builder /app/dist ./dist

ENV PORT=8080
EXPOSE 8080

CMD ["http-server", "dist", "-p", "8080", "--spa"]
