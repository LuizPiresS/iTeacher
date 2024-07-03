FROM node:lts-alpine

# Atualiza os índices dos repositórios de pacotes
RUN apk update

# Adiciona bash e libc6-compat
RUN apk add --no-cache bash libc6-compat

# Instalação global do Prisma e NestJS CLI
RUN npm install -g @nestjs/cli prisma

# Define o diretório de trabalho
WORKDIR /home/node/app

# Copia os arquivos do projeto para o contêiner
COPY . .

# Instala as dependências do projeto como root
RUN npm install

# Executa prisma generate para garantir que os binários corretos sejam gerados
RUN npx prisma generate

# Ajusta permissões da pasta node_modules
RUN chown -R node:node /home/node/app/node_modules

# Define o usuário node para rodar a aplicação
USER node

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:dev"]
