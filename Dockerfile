# Stage 1 - Base
FROM node:20 AS base

WORKDIR /usr/src

ENV PATH="/root/.bun/bin:${PATH}"
ENV TZ=America/Sao_Paulo

RUN apt-get update -y \
  && apt-get install -y curl mariadb-client iputils-ping \
  # Instalar dependências necessárias para o Puppeteer e Chromium
  && apt-get install -y \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  lsb-release \
  xdg-utils \
  wget \
  chromium \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | bash

RUN npm install -g @nestjs/cli

RUN npm install -g prisma

ADD start.sh /usr/local/bin/start.sh

RUN chmod +x /usr/local/bin/start.sh

# Adicionar o caminho do Chromium ao PATH
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Stage 2 - Builder
FROM base AS builder

ENV NODE_ENV=production

COPY package*.json ./

COPY . .

RUN npm install 

RUN npm run prisma:generate

RUN npm run build 

# Stage 3 - Produção
FROM base AS production

ENV NODE_ENV=production

COPY --from=builder /usr/src/package.json ./package.json
COPY --from=builder /usr/src/tsconfig.json ./tsconfig.json
COPY --from=builder /usr/src/node_modules ./node_modules
COPY --from=builder /usr/src/prisma ./prisma
COPY --from=builder /usr/src/dist ./dist
COPY --from=builder /usr/src/.env ./.env.production.local

RUN addgroup --gid 1001 --system nestjs \
  && adduser --system --uid 1001 nestjs
USER nestjs

EXPOSE 4000

ENTRYPOINT ["node", "dist/src/main"]

# Stage 4 - Desenvolvimento
FROM base AS development

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

COPY . .

EXPOSE 4000

CMD ["/usr/local/bin/start.sh"]