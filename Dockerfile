FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]