# syntax=docker/dockerfile:1.7-labs
FROM golang:1.22-alpine AS builder
WORKDIR /app

# 依存取得はレイヤキャッシュを効かせる
COPY go.mod go.sum ./
RUN apk add --no-cache git \
    && --mount=type=cache,id=gomodcache,target=/go/pkg/mod \
       go mod download

# アプリ本体
COPY . .

# 依存整備（必要なら）※ cache mount は id を必ず付ける
RUN --mount=type=cache,id=gomodcache,target=/go/pkg/mod \
    --mount=type=cache,id=gobuildcache,target=/root/.cache/go-build \
    go mod tidy

# ビルド（キャッシュ活用）
RUN --mount=type=cache,id=gomodcache,target=/go/pkg/mod \
    --mount=type=cache,id=gobuildcache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server ./cmd/api

# 実行イメージ（distroless 非root）
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /
COPY --from=builder /app/server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]
