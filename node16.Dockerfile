FROM node:16-alpine3.13

EXPOSE 3000

WORKDIR /app

COPY app .

RUN npm install

CMD [ "node", "index.js" ]
