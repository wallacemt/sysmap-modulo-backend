FROM node:22.13.1

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]