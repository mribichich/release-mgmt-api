FROM node:10
LABEL maintainer="Matias Ribichich <guli4073@gmail.com>"

WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build:prod
# RUN yarn test
RUN yarn install --production


FROM node:10-alpine
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app .
ENV NODE_ENV=production
CMD ["node", "index"]
