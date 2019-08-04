FROM node:10.16.1-alpine

RUN apk update
RUN apk upgrade
RUN apk add --update tzdata
ENV TZ=Asia/Seoul
RUN rm -rf /var/cache/apk/*

COPY . /app

VOLUME /app/logs

WORKDIR /app

ENTRYPOINT npm start

EXPOSE 3000