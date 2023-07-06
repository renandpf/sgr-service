###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2022-03-05                                              ##
## version         : 2.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
ARG NODE_VERSION=16.15.0

FROM node:${NODE_VERSION}-alpine as build
WORKDIR /opt

COPY package.json tsconfig.json tsconfig.compile.json .barrelsby.json ./


RUN npm install

COPY ./src ./src


RUN npm run build

FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt
WORKDIR $WORKDIR

RUN apk update && apk add build-base git curl
RUN npm install -g pm2

COPY --from=build /opt .

RUN yarn install

COPY ./views ./views
COPY processes.config.js .

EXPOSE 8083
ENV PORT 8083
ENV NODE_ENV production

CMD ["npm", "start"]