# web_olympus

## install
You can use nodejs v18.
```
npm install
```

## compile your TypeScript file:
tsc server.tsx

## start app
npm run start

## test
npm run test

## docker build
docker-compose up --build

## docker up
docker-compose up

## docker down
docker-compose down

## example get request
The query is optional

curl --location 'http://127.0.0.1:5001/api/contact/list?name=Micheal'

## example post request

curl --location 'http://127.0.0.1:5001/api/contact/add' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Micheal",
    "surname": "Levit",
    "email": "rrrr@gmail.com",
    "phone": "900004404",
    "message": "Tested with postman"
}'