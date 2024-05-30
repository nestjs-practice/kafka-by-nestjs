FROM node:18.14.2 AS build

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

# Run stage
FROM node:18.14.2 AS run

WORKDIR /usr/src/app

# Copy only the built files and node_modules from the build stage
COPY --from=build /usr/src/app ./

# Start the NestJS application
CMD ["npm", "start"]