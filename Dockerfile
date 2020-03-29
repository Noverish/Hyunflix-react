FROM node:12.16.1-alpine as builder

WORKDIR /app

COPY src/          /app/src
COPY public/       /app/public
COPY package.json  /app/package.json
COPY tsconfig.json /app/tsconfig.json

RUN npm install

RUN npm run build

FROM nginx:1.17.3-alpine

RUN apk add --no-cache tzdata
ENV TZ='Asia/Seoul'

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf