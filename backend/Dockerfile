# ---------- Stage 1 : Install dependencies ----------
FROM node:20-bookworm-slim AS deps

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

# ---------- Stage 2 : Build ----------
FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# ---------- Stage 3 : Production ----------
FROM node:20-bookworm-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

RUN groupadd -r nodejs && useradd -r -g nodejs appuser

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

RUN chown -R appuser:nodejs /app

USER appuser

EXPOSE 5000

CMD ["node","dist/server.js"]