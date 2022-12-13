FROM node:18-alpine as builder
ENV NODE_ENV=development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

FROM builder as dev
CMD yarn start

FROM builder as prod
CMD yarn build

FROM nginx:1.23
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
