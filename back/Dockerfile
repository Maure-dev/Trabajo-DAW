FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

RUN npm run build

# Copy templates to dist
RUN mkdir -p dist/modules/surveys/templates && cp -r src/modules/surveys/templates/* dist/modules/surveys/templates/

# Install PM2
RUN npm install pm2 -g

# Expose the port Nest uses
EXPOSE 3000

# Copy PM2 config
COPY ecosystem.config.js .

# Run the app
CMD ["pm2-runtime", "ecosystem.config.js"]