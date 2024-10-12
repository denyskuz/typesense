FROM node:alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install

COPY . .

RUN npx nx build etl_service --prod --verbose --skip-nx-cache