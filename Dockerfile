FROM node:lts-alpine
ENV APP=/usr/src/app
RUN chown -R node:node $APP/*
USER node
WORKDIR $APP

# install glibc for flow
# cf. https://github.com/facebook/flow/issues/3649#issuecomment-447115855
RUN apk --no-cache add ca-certificates wget
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.30-r0/glibc-2.30-r0.apk
RUN apk add glibc-2.30-r0.apk ncurses
