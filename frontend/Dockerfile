FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package manifests first for better Docker cache usage
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the project files
COPY . .

# Expose Vite's default port
EXPOSE 5173
