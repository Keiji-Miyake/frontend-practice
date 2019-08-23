FROM node:lts-alpine
ENV APP=/home/app
USER node
WORKDIR $APP
