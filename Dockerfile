FROM node:18

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD ["npm", "start"]