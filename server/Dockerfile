# Stage 1: Build
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
EXPOSE 4000
CMD ["node", "dist/index.js"]
