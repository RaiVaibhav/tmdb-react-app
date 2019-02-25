FROM node:11.5.0

RUN mkdir -p /app

ADD package.json /app
WORKDIR /app

RUN yarn install
ADD . /app
RUN yarn build
RUN yarn global add serve

EXPOSE 5000

CMD ["serve", "-s", "build"]