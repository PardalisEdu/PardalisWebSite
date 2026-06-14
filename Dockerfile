# Step 1: Base image for building the application
FROM docker.io/library/node:20-alpine AS builder

WORKDIR /app

# Copy configuration files and package.json
COPY package.json svelte.config.js vite.config.js jsconfig.json postcss.config.js drizzle.config.js ./

# Install all dependencies (development + production) for building
RUN npm install

# Copy source code and assets
COPY src ./src
COPY static ./static

# Build the SvelteKit application
RUN DATABASE_URL="mysql://root:placeholder@localhost:3306/placeholder" \
    BETTER_AUTH_SECRET="placeholder_secret_must_be_changed_in_production_1234" \
    BETTER_AUTH_URL="http://localhost:4891" \
    NODE_OPTIONS="--max-old-space-size=1024" \
    npm run build

# Install only production dependencies in a separate step to keep the final image minimal
WORKDIR /prod-deps
COPY package.json ./
RUN npm install --omit=dev


# Step 2: Final runner image
# Since the project uses @sveltejs/adapter-node, we use a standard, lightweight Node image
FROM docker.io/library/node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=4891
ENV HOST=0.0.0.0

# Copy build artifacts and production dependencies from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /prod-deps/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose SvelteKit port
EXPOSE 4891

# Start the SvelteKit application
CMD ["node", "build/index.js"]
