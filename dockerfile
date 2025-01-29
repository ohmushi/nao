FROM node:22-alpine AS build


WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "clean-install"]
COPY . .
RUN STRIPE_SECRET_API_KEY="_" \
    VITE_STRIPE_PUBLIC_API_KEY="_ _" \
    npm run build

FROM node:22-alpine AS run
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/build build
RUN ["npm", "clean-install", "--omit", "dev"]
CMD ["node", "build"]