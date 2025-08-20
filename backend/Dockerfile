# syntax=docker/dockerfile:1.7-labs

########## Builder ##########
FROM golang:1.22-alpine AS builder
WORKDIR /app

# ツール（例: git）
RUN apk add --no-cache git ca-certificates

# 依存取得（キャッシュ有効化：id を必ず付ける）
COPY go.mod go.sum ./
RUN --mount=type=cache,id=gomodcache,target=/go/pkg/mod \
    go mod download

# アプリ本体
COPY . .

# 依存整備（必要なら）
RUN --mount=type=cache,id=gomodcache,target=/go/pkg/mod \
    --mount=type=cache,id=gobuildcache,target=/root/.cache/go-build \
    go mod tidy

# ビルド
# ※ main の場所が ./cmd/api でない場合は修正してください
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN --mount=type=cache,id=gomodcache,target=/go/pkg/mod \
    --mount=type=cache,id=gobuildcache,target=/root/.cache/go-build \
    go build -trimpath -o /app/server ./cmd/api

########## Runner ##########
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /
COPY --from=builder /app/server /server

# Railway は PORT を環境変数で渡すことが多い（Go 側でPORTを読んでListenする場合は残す）
# EXPOSE は任意（メモ用途）
EXPOSE 8080

USER nonroot:nonroot
ENTRYPOINT ["/server"]
