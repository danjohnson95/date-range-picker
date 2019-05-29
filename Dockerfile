FROM node:11.5.0

RUN npm i npm@latest -g

WORKDIR /opt

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

ENTRYPOINT [ "npm" ]