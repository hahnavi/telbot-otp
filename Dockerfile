FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install --only=production

EXPOSE 3000
CMD [ "npm", "start" ]
