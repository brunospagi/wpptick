# Etapa de Build
FROM node:20-alpine as build-deps
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install webpack --legacy-peer-deps
RUN npm install material-ui-popup-state --legacy-peer-deps
RUN npm install @emotion/react @emotion/styled --legacy-peer-deps

COPY . .
# Caso queira passar a URL no momento do build através do docker-compose:
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

# Etapa de Produção com Nginx
FROM nginx:alpine
RUN apk add --no-cache jq openssl wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENV PUBLIC_HTML=/var/www/public/

# Certifique-se de que este ficheiro existe localmente no seu projeto
# COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf 

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

# COPY .docker/add-env-vars.sh /docker-entrypoint.d/01-add-env-vars.sh
# RUN chmod +x /docker-entrypoint.d/01-add-env-vars.sh

CMD ["nginx", "-g", "daemon off;"]