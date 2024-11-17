# Build stage
FROM node:16-alpine AS build

WORKDIR /app

# Copy package.json and install both production and development dependencies
COPY package*.json .
COPY postman-collections /app/postman-collections

RUN npm install

# Copy the rest of the files and run the build command
COPY . .

# Run Babel to transpile the code
RUN npm run build

# Production stage
FROM node:16-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

# Copy the transpiled code from the build stage
COPY --from=build /app/dist ./dist

# Copy the postman-collections directory to the production stage
COPY --from=build /app/postman-collections ./postman-collections

CMD ["node", "dist/index.js"]
