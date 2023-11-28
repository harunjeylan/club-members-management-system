FROM node:lts-alpine3.18

ENV NODE_ENV production

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./dist .

COPY ./src/prisma ./prisma

RUN npx prisma generate

CMD [ "node", "main.js" ]

EXPOSE 8080