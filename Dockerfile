FROM node:14.14.0-slim

COPY . .

RUN npm install
RUN node_modules/typescript/bin/tsc

ENTRYPOINT ["node", "/lib/main.js"]
