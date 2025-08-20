# syntax=docker/dockerfile:1.7-labs
FROM golang:1.22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git ca-certificates

# ここをあなたの Service ID に置換 ↓↓↓
# 例) SERVICE_ID=6079c127-c772-462c-997d-d0a962b555a6
#     id は s/<SERVICE_ID>-<target> という形式にする
COPY go.mod go.sum ./
RUN --mount=type=cache,id=s/6079c127-c772-462c-997d-d0a962b555a6-/go/pkg/mod,target=/go/pkg/mod \
    go mod download

COPY . .

ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN --mount=type=cache,id=s/6079c127-c772-462c-997d-d0a962b555a6-/go/pkg/mod,target=/go/pkg/mod \
    --mount=type=cache,id=s/6079c127-c772-462c-997d-d0a962b555a6-/root/.cache/go-build,target=/root/.cache/go-build \
    go build -trimpath -o /app/server ./cmd/api

FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /
COPY --from=builder /app/server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]
