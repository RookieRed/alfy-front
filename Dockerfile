FROM node:12

RUN npm install -g @angular/cli@7
RUN mkdir /web /prod
WORKDIR /web
