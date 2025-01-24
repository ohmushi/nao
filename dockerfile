FROM node:22-alpine AS build

RUN --mount=type=secret,id=STRIPE_SECRET_API_KEY,env=STRIPE_SECRET_API_KEY \
    echo "mount"; echo -n $STRIPE_SECRET_API_KEY | wc -c
RUN echo "after"; echo -n $STRIPE_SECRET_API_KEY | wc -c
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