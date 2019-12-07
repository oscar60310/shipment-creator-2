FROM node:10.17.0-stretch
RUN mkdir /sc-web
WORKDIR /sc-web
COPY ./build /sc-web
COPY ./package.json /sc-web
COPY ./package-lock.json /sc-web
RUN npm install --production
CMD ["node", "./server/app.js"]