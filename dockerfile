FROM node:22-alpine AS build


WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "clean-install"]
COPY . .
RUN --mount=type=secret,id=STRIPE_SECRET_API_KEY,env=STRIPE_SECRET_API_KEY \
    npm run build

FROM node:22-alpine AS run
WORKDIR /usr/src/app
RUN ["rm", "-rf", "./*"]
COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/build build
RUN ["npm", "clean-install", "--omit", "dev"]
CMD ["node", "build"]