FROM node:26-alpine
WORKDIR /app
COPY package*.json ./
run npm install --only=production
COPY . .
CMD ["npm", "start"]