FROM node

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.0 main" > /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update
RUN apt-get install -y bash
RUN apt-get install -y mongodb-org-tools

WORKDIR /app

ENV NODE_PATH /node_modules
VOLUME /node_modules

CMD sh -c 'yarn install && yarn user-import && yarn location-import && yarn run server'
