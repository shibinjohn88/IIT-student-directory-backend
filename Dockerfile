# Use the official Node.js image as the base image
FROM node:20-alpine

# Set environment variables
ENV PORT=3000
# ENV RDS_HOSTNAME=host.docker.internal
# ENV RDS_USERNAME=postgres
# ENV RDS_PASSWORD=password
# ENV RDS_PORT=5432
# ENV RDS_DB_NAME=student_directory

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE ${PORT}

# Start the application
CMD ["node", "index.js"]
