# Use the official Node.js image
FROM node:18 AS build

# Create and set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY frontend/package*.json ./
COPY frontend/yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY frontend/ ./

# Build the React app
RUN yarn build

# Use the official Nginx image to serve the app
FROM nginx:latest

# Copy built React app to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
