# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# API エンドポイントはビルド時に埋め込む（ランタイムでも上書き可）
ARG NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

RUN --mount=type=cache,target=/root/.npm \
    npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# ランタイムでも参照できるように同名 ENV を保持
ENV NEXT_PUBLIC_API_BASE_URL=""

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./

# Next.js 13+/15 で standalone でない場合は node_modules が必要
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
