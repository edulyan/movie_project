FROM node:14

WORKDIR /app

COPY /*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]