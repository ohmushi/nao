FROM node:22-alpine AS build

ARG VITE_STRIPE_PUBLIC_API_KEY
ENV VITE_STRIPE_PUBLIC_API_KEY=$VITE_STRIPE_PUBLIC_API_KEY

WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "clean-install"]
COPY . .
RUN npm run build 

FROM node:22-alpine AS run
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/build build
RUN ["npm", "clean-install", "--omit", "dev"]
CMD ["node", "build"]