FROM node:18-alpine3.17
WORKDIR app
COPY . .
RUN npm install
EXPOSE 8000 9000
CMD npm run start