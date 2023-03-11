FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN yarn install --production

COPY . .

RUN yarn run next build

EXPOSE 3000

CMD ["yarn", "start"]
