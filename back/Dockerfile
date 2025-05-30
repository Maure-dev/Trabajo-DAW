FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Nest uses
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:dev"]
