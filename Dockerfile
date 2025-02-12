# Étape 1 : Construction du frontend
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

RUN npm install

# Copier tout le projet pour la construction
COPY . .

RUN npm run build

# Étape 2 : Nginx pour production
FROM nginx:alpine AS production-stage

# Copier les fichiers générés dans le répertoire dist de Vue
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
