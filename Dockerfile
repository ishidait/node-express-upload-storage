FROM node:12
WORKDIR /app

# Install locales
RUN apt-get update && apt-get install -y locales
RUN locale-gen en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
RUN localedef -f UTF-8 -i en_US en_US.UTF-8

COPY package.json package*.json ./
RUN npm install
# RUN npm install --only=production

COPY . .
CMD ["npm", "start"]