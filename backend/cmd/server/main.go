package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/rikut0904/Bini/backend/internal/db"
	"github.com/rikut0904/Bini/backend/internal/http"
    "github.com/joho/godotenv"
)

func main() {
    _ = godotenv.Load()
	// DB接続
	conn, err := db.Connect(context.Background())
	if err != nil {
		log.Fatalf("db connect error: %v", err)
	}
	defer conn.Close()

	// マイグレーション（idempotent）
	if err := db.Migrate(context.Background(), conn, "migrations"); err != nil {
		log.Fatalf("db migrate error: %v", err)
	}

	// ルータ
	r := httpapi.NewRouter(conn)

	// ポート（RailwayはPORT注入）
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           r,
		ReadHeaderTimeout: 10 * time.Second,
	}

	log.Printf("Go backend listening on :%s", port)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server error: %v", err)
	}
}
