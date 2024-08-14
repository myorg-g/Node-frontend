# Step 1: Use an official Node.js image as the base
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the current directory contents into the container at /app
COPY . .
# Step 5: Expose the port the app runs on
EXPOSE 8080

# Step 6: Start a simple HTTP server to serve the static files
RUN npm install -g http-server

# Step 7: Command to run the app
CMD ["http-server", "-p", "8080"]
