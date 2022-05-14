FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./

COPY src ./src
COPY templates ./templates

RUN npm install
RUN mkdir ./public
RUN mkdir ./rendered

EXPOSE 3000

CMD ["npm", "run", "start"]