FROM node:18-alpine

WORKDIR /nextjs-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
