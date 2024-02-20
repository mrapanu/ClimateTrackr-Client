FROM node:20.11-alpine

# Set the environment variable for the API URL during the build
ENV REACT_APP_API_URL=REACT_APP_API_URL_REPLACE

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

RUN npm install -g uglify-js

RUN find src -name '*.js' -exec uglifyjs {} -o dist/bundle.js --compress --mangle \;

# Build the React app
RUN npm run build

FROM nginx:alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

WORKDIR /usr/local/bin

COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

# Expose the port that the nginx server will run on
EXPOSE 80

ENTRYPOINT ["/bin/sh", "entrypoint.sh"]
