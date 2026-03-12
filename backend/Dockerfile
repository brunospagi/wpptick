FROM node:20-alpine

WORKDIR /app

# Instalar dependências de sistema (Puppeteer, FFmpeg, etc)
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont \
  ffmpeg \
  git \
  python3 \
  make \
  g++ \
  wget \
  tar \
  openssl \
  libc6-compat \
  tzdata

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Fazer o build do backend
RUN npm run build

EXPOSE 8080

# Se tiver um ficheiro entrypoint (para rodar migrações, etc), deixe a linha abaixo:
# COPY ./docker/backend-entrypoint.sh /usr/local/bin/
# RUN chmod +x /usr/local/bin/backend-entrypoint.sh && sed -i 's/\r$//' /usr/local/bin/backend-entrypoint.sh
# CMD ["backend-entrypoint.sh"]

# Se não utilizar o entrypoint.sh, utilize apenas:
CMD ["npm", "start"]