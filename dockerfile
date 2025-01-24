FROM node:22-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "clean-install"]
COPY . .
RUN ["npm", "run", "build"]

FROM node:22-alpine AS run
WORKDIR /usr/src/app
RUN ["rm", "-rf", "./*"]
COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/build build
COPY ./src/lib/server/db/* /usr/src/app/db/
RUN ["npm", "clean-install", "--omit", "dev"]
CMD ["node", "build"]