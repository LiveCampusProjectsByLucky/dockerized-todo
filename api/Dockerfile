# Dockerfile-adonis

# Base image
FROM node:alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3333

# Start the application
CMD /bin/sh -c "node ace migration:run && node build/bin/server.js && tail -f /dev/null"