# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --silent

# Copy the rest of the app code to the container
COPY . .

# Build the app
RUN npm run build

# Set the command to run the app
CMD ["npm", "start"]
