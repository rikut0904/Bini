# syntax=docker/dockerfile:1.7-labs
FROM golang:1.22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git ca-certificates

COPY go.mod go.sum ./
RUN --mount=type=cache,id=s/0d624aee-2d1a-4825-a406-eb095ea4a6eb-/go/pkg/mod,target=/go/pkg/mod \
    go mod download

COPY . .

ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64
RUN --mount=type=cache,id=s/0d624aee-2d1a-4825-a406-eb095ea4a6eb-/go/pkg/mod,target=/go/pkg/mod \
    --mount=type=cache,id=s/0d624aee-2d1a-4825-a406-eb095ea4a6eb-/root/.cache/go-build,target=/root/.cache/go-build \
    go build -trimpath -o /app/server ./cmd/api

FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /
COPY --from=builder /app/server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]
