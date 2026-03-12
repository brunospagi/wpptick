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

# =========================================================================
# SOLUÇÃO DAS ROTAS (SPA)
# Cria a configuração do Nginx com a regra try_files apontando pro index.html
# =========================================================================
RUN echo "server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    location / { \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]