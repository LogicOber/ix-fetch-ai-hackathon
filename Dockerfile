FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/serve.json ./serve.json

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080", "--config", "./serve.json"]
