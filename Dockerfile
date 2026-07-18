# syntax=docker/dockerfile:1

# Step 1: Base image for building the application
FROM oven/bun:1 AS builder

WORKDIR /app

# Copiar archivos de configuración
COPY package.json bun.lock svelte.config.js vite.config.js jsconfig.json drizzle.config.js ./

# Instalar dependencias con caché persistente entre builds:
# aunque cambie bun.lock, los paquetes ya descargados no se vuelven a bajar.
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Copiar código fuente
COPY src ./src
COPY static ./static

# Construir la aplicación. Los valores son placeholders: todas las env se leen
# en runtime ($env/dynamic/private), no se hornean en el build.
RUN DATABASE_URL="mysql://root:placeholder@localhost:3306/placeholder" \
    BETTER_AUTH_SECRET="placeholder" \
    BETTER_AUTH_URL="http://localhost:4891" \
    NODE_OPTIONS="--max-old-space-size=1024" \
    bun run build

# Instalar solo dependencias de producción (reutiliza la misma caché)
WORKDIR /prod-deps
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --production --frozen-lockfile

# Step 2: Final runner image (Node, porque usamos @sveltejs/adapter-node)
FROM docker.io/library/node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4891
ENV HOST=0.0.0.0

COPY --from=builder /app/build ./build
COPY --from=builder /prod-deps/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4891

CMD ["node", "build/index.js"]
