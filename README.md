# API NFSE - Curitiba

## Pré-requisitos

- Docker
- Docker Compose

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```properties
DATABASE_URL="mysql://<usuario_db>:<senha_db>@database:3306/<nome_db>"
DATABASE_NAME="<nome_db>"
DATABASE_USER="<usuario_db>"
DATABASE_PASSWORD="<senha_db>"
FORWARD_PHPMYADMIN_PORT=10000

NFSE_URL="https://isscuritiba.curitiba.pr.gov.br/Iss.NfseWebService/NfseWs.asmx"
NFSE_CERT_PASS="<senha_certificado>"
```

## Configuração do RabbitMQ

Este projeto utiliza o RabbitMQ para comunicar este microsserviço com a aplicação principal. Certifique-se de ter o RabbitMQ em execução antes de iniciar o microsserviço.

### Executando o RabbitMQ com Docker

Para executar o RabbitMQ usando Docker, utilize o seguinte comando:

```bash
docker run -d --hostname my-rabbit --name some-rabbit \
  -e RABBITMQ_DEFAULT_USER=usuario \
  -e RABBITMQ_DEFAULT_PASS=senha \
  -p 5672:5672 -p 15672:15672 \
  rabbitmq:3-management
```

### Interfaces para consumo do microsserviço

## O CMD é a queue . metódo, ao enviar o CMD para a queue, deve considerar somente o metódo de envio; A queue é apenas para documentar a fila que o microsserviço escuta;

  - [4.1.n]: Emitir nota fiscal cmd -> `issue_fiscal_note`
  - [4.2.n]: Consultar nota fiscal cmd -> `fetch_fiscal_note` [Id da nota]
  - [4.3.n]: Cancelar nota fiscal cmd -> `cancel_fiscal_note` [Id da nota]
  - [4.4.n]: Listar notas fiscais cmd -> `list_fiscal_notes`
