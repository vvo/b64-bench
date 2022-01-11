FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY index.js index.js

CMD [ "node", "index.js" ]