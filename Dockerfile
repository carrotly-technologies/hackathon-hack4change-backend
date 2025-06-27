##############
#### BASE ####
##############
FROM node:22.14.0-alpine@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944 as base

ONBUILD RUN apk add curl bash 
#openssl1.1-compat
ONBUILD RUN curl -sL https://sentry.io/get-cli/ | bash

ONBUILD ARG NPM_BASE_DOMAIN
ONBUILD ARG NPM_SCOPE
ONBUILD ARG NON_VOLOTILE_NPM_TOKEN

ONBUILD RUN npm config set "${NPM_SCOPE}:registry" "https://${NPM_BASE_DOMAIN}packages/npm/"
ONBUILD RUN npm config set "//${NPM_BASE_DOMAIN}packages/npm/:_authToken" "${NON_VOLOTILE_NPM_TOKEN}"
ONBUILD RUN npm config set "//${NPM_BASE_DOMAIN}projects/:_authToken" "${NON_VOLOTILE_NPM_TOKEN}"
ONBUILD RUN yarn config set "${NPM_SCOPE}:registry" "https://${NPM_BASE_DOMAIN}packages/npm/"

ONBUILD WORKDIR /app

###############
#### BUILD ####
###############
FROM base as build

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn --ignore-engines --frozen-lockfile
COPY . .
RUN yarn build
RUN sentry-cli sourcemaps inject /app/dist

#################
#### MODULES ####
#################
FROM base as modules

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production --ignore-engines --frozen-lockfile

#################
#### RELEASE ####
#################
FROM node:22.14.0-alpine@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944 as release

WORKDIR /app

#RUN apk add openssl1.1-compat
RUN apk add bash curl

COPY package.json package.json
COPY yarn.lock yarn.lock

COPY --from=modules /app/node_modules /app/node_modules

COPY migrate-mongo-config.js /app/migrate-mongo-config.js
COPY migrations /app/migrations
COPY .env.example /app/.env
COPY schema.gql /app/schema.gql 
COPY --from=build /app/dist /app/dist

EXPOSE 3000
ARG VERSION=dev

ENV NODE_ENV=production \
  APP_VERSION=$VERSION \
  SENTRY_VERSION=$VERSION \
  HOST=0.0.0.0 \
  PORT=3000

CMD [ "yarn", "start:prod" ]
