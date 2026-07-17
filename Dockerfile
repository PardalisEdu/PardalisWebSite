# Step 1: Base image for building the application
FROM oven/bun:1 AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package.json bun.lock svelte.config.js vite.config.js jsconfig.json drizzle.config.js ./

# Instalar dependencias a la velocidad de la luz
RUN bun install

# Copiar código fuente
COPY src ./src
COPY static ./static

# Construir la aplicación
RUN DATABASE_URL="mysql://root:placeholder@localhost:3306/placeholder" \
    BETTER_AUTH_SECRET="placeholder" \
    BETTER_AUTH_URL="http://localhost:4891" \
    NODE_OPTIONS="--max-old-space-size=1024" \
    bun run build

# Instalar solo dependencias de producción
WORKDIR /prod-deps
COPY package.json bun.lock ./
RUN bun install --production

# Step 2: Final runner image (Se mantiene igual, usando Node)
FROM docker.io/library/node:20-alpine AS runner
# ... resto de tu Dockerfile actual