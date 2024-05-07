FROM node:18.12.1-slim
WORKDIR /api
COPY package.json /api/
RUN yarn
COPY . /api/
EXPOSE 8080
CMD ["yarn", "dev"]