# ETAPA 1: Compilación del frontend
FROM node:24-alpine AS build

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./

RUN npm ci

# Copiar código fuente
COPY . .

# Configurar la ruta de la API
ENV VITE_API_URL=/api

# Compilar React
RUN npm run build


# ETAPA 2: Servidor web
FROM nginx:alpine

# Copiar la aplicación compilada
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de Nginx
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Puerto HTTP
EXPOSE 80

# Ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]