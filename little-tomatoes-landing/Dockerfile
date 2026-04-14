FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@10.4.1

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

# Build (vite outputs to dist/public)
COPY . .
RUN pnpm build

# ---- Production: static file server ----
FROM node:20-alpine AS runner

RUN npm install -g serve

WORKDIR /app

# Copy only the built static assets
COPY --from=builder /app/dist/public ./public

EXPOSE 8080
ENV PORT=8080

# -s = SPA mode (serves index.html for unknown routes)
# -l = listen port
CMD ["serve", "-s", "public", "-l", "8080"]
