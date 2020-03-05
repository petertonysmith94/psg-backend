FROM alpine:3.10

# Set the working directory
WORKDIR /app

# Adds dependencies
RUN apk update && apk --no-cache add nodejs yarn

# Adds configuration files
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

# Install packages
RUN yarn install

# Copy application code
COPY ./ /app/

# Compile assets
RUN yarn build

# Starts node exposing the necessary ports
EXPOSE 80
CMD ["yarn", "run", "start"]