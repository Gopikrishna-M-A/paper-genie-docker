FROM node:16 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install --force

COPY . .

CMD [ "npm", "start"]