# syntax=docker/dockerfile:1.7-labs

########## Builder ##########
FROM golang:1.22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git ca-certificates

# 依存取得（Service ID でプレフィックスした cache mount）
COPY go.mod go.sum ./
RUN --mount=type=cache,id=s/9ee88210-82cb-4e17-93dd-162827b0116f-gomod,target=/go/pkg/mod \
    go mod download

# ソース
COPY . .

# ビルド（go-build キャッシュも同様に付与）
ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
# main の場所は ./cmd/api をあなたの構成に合わせて変更可
RUN --mount=type=cache,id=s/9ee88210-82cb-4e17-93dd-162827b0116f-gomod,target=/go/pkg/mod \
    --mount=type=cache,id=s/9ee88210-82cb-4e17-93dd-162827b0116f-gobuild,target=/root/.cache/go-build \
    go build -trimpath -o /app/server ./cmd/api

########## Runner ##########
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /
COPY --from=builder /app/server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]
