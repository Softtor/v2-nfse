#!/bin/sh

# Esperar pelo banco de dados estar disponível
/usr/local/bin/wait-for-it.sh database:3306 --timeout=60 --strict -- echo "Database is up"

# CD to workdir
cd /usr/src

npm run prisma:generate

# Executar as migrações do Prisma
npm run prisma:migrate:deploy

npm run seed

# Iniciar a aplicação
if [ "$NODE_ENV" = "development" ]; then
  npm run start:dev
else
  npm run start:prod
fi