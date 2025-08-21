# syntax=docker/dockerfile:1.7

FROM golang:1.22 AS deps
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download

FROM golang:1.22 AS builder
WORKDIR /src
ARG SERVICE_ID=""
ENV SERVICE_ID=${SERVICE_ID}
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -trimpath -ldflags "-s -w" -o /out/app ./cmd/server

FROM gcr.io/distroless/base-debian12:nonroot
WORKDIR /app
COPY --from=builder /out/app /app/app
COPY migrations ./migrations
ENV PORT=8080
ENV SERVICE_ID=""
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/app/app"]
