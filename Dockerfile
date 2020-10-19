FROM node:12-slim
WORKDIR /app
COPY package.json package*.json ./
RUN npm install --only=production
COPY . .
CMD ["npm", "start"]