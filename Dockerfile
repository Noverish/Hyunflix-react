# REACT
FROM node:10.16.3-alpine as builder

RUN apk add --no-cache tzdata
ENV TZ='Asia/Seoul'

WORKDIR /app

COPY node_modules/ /app/node_modules
COPY public/       /app/public
COPY src/          /app/src
COPY package.json  /app
COPY tsconfig.json /app

RUN npm run build

# NGINX
FROM nginx:1.17.3-alpine

RUN apk add --no-cache tzdata
ENV TZ='Asia/Seoul'

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
