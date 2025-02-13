# Étape 1 : Construction du frontend
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./ 

# Mettre à jour npm
RUN npm install -g npm@latest

# Installer les dépendances avec l'option --legacy-peer-deps si nécessaire
RUN npm install --legacy-peer-deps

# Copier tout le projet pour la construction
COPY . .

# Construire l'application avec des logs détaillés
RUN npm run build --verbose

# Étape 2 : Nginx pour la production
FROM nginx:alpine AS production-stage

# Copier les fichiers générés dans le répertoire dist
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
