FROM node:14-alpine

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install --production

EXPOSE 3000
CMD [ "npm", "start" ]
