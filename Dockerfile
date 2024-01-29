FROM node:20.11.0-alpine3.19

WORKDIR /opt/app

COPY ./ /opt/app

RUN npm install -g npm@10.4.0 \
  && npm install -g jest@latest \
  && npm install --force
