FROM node:18

COPY . /app
WORKDIR /app

EXPOSE 5001

RUN npm install 

CMD [ "npm", "start" ]
