# Dockerfile-react

# Base image
FROM node:alpine

RUN npm install -g http-server

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

EXPOSE 3000

CMD [ "http-server", "-p", "3000", "dist" ]