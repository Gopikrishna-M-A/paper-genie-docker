FROM node:20 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]

 