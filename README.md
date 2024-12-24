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

- [1.0-c]: Interface para comunicação com os métodos para manipulação de dados de clientes (tomadores do serviço)

  - [1.1.c]: Salvar cliente cmd -> `insert_client`
  - [1.2.c]: Consultar cliente cmd -> `fetch_client` [Id do cliente]
  - [1.3.c]: Consultar notas do cliente cmd -> `fetch_client_fiscal_notes` [Id do cliente]

- [2.0-fc]: Interface para comunicação com os métodos de configurações fiscais

  - [2.1.fc]: Salvar configuração fiscal cmd -> `FISCAL_CONFIG.insert_fiscal_config`
  - [2.2.fc]: Atualizar configuração fiscal cmd -> `FISCAL_CONFIG.update_fiscal_config` [Id da configuração]
  - [2.3.fc]: Consultar configuração fiscal cmd -> `FISCAL_CONFIG.fetch_fiscal_config` [Id da configuração]

- [3.0-s]: Interface para comunicação com métodos para manipulação e consulta de dados de serviços

  - [3.1.s]: Salvar serviço cmd -> `insert_service`
  - [3.2.s]: Atualizar serviço cmd -> `update_service` [Id do serviço]
  - [3.3.s]: Consultar serviço cmd -> `fetch_service` [Id do serviço]
  - [3.4.s]: Listar serviços cmd -> `list_services` #pending
  - [3.5.s]: Deletar serviço cmd -> `remove_service` [Id do serviço]

- [4.0-n]: Interface para comunicação com métodos para manipulação e consulta de dados de notas fiscais
  - [4.1.n]: Emitir nota fiscal cmd -> `issue_fiscal_note`
  - [4.2.n]: Consultar nota fiscal cmd -> `fetch_fiscal_note` [Id da nota]
  - [4.3.n]: Cancelar nota fiscal cmd -> `cancel_fiscal_note` [Id da nota]
  - [4.4.n]: Listar notas fiscais cmd -> `list_fiscal_notes`
