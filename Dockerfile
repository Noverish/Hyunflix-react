FROM node:10.16.3-alpine

WORKDIR /app

COPY src/          /app/src
COPY public/       /app/public
COPY package.json  /app/package.json
COPY tsconfig.json /app/tsconfig.json

RUN npm install

ENTRYPOINT npm start
