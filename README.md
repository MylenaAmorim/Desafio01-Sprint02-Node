# Desafio01-Sprint02-Node

## Projeto

API cuja funcionalidade assemelha-se ao Trello ou a um Bloco de notas.

## Desenvolvimento

### Desenvolvimento:
   Desenvolvido em Node.js, usando o web framework ExpressJS e o banco de dados relacional MySql para criação de um CRUD(Create, Read, Update e Remove) fazendo uso do ORM Sequelize e o utilitário 
   de linha de comando Sequelize CLI que auxilia em diversas atividades ligadas aos models da nossa aplicação, incluindo funcionalidades para nos ajudar com migrations. 
   A aplicação é capaz de cadastrar novos projetos contendo tasks, alterar os projetos, listar os projetos e deletar projetos:
  
## Instruções necessárias para rodar a aplicação

Clonar o repositório:
```
git clone https://github.com/MylenaAmorim/Desafio01-Sprint02-Node.git
```
### Instalação, Tecnologias e Depedências
 - Baixar e instalar o Node.js (https://nodejs.org/en/download/current/);
 - Entrar na pasta Desafio01-Sprint02-Node;
 - No terminal de linha de comando e, dentro da pasta do projeto, digitar:
 ```npm run dev```

 - Comandos para gerar migrations no Sequelize-CLI:
 
   ```npx sequelize-cli init``` - inicializa o projeto com o Sequelize-CLI, criando a pasta config e migrations
   
   ```npx sequelize-cli db:create```- cria o banco de dados informando no arquivo ```api/config/config.json```

   ```npx sequelize-cli migration:generate --name create-project``` - cria o arquivo migrate na pasta das migrations

   ```npx sequelize-cli db:migrate``` - roda a migrate e cria a tabela

   ```npx sequelize-cli db:migrate:undo``` - desfaz a última migrate
