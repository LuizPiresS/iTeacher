FROM node:lts-alpine

RUN apk add --no-cache bash

RUN apk add --no-cache openssl1.1-compat
RUN apk add --no-cache libc6-compat

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app
