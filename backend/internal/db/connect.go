package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func dsnFromEnv() (string, error) {
	if url := os.Getenv("DATABASE_URL"); url != "" {
		// 例: postgres://user:pass@host:port/dbname?sslmode=require
		return url, nil
	}
    return "", fmt.Errorf("DATABASE_URL not set; please configure it via environment or .env")
}

// envOr is no longer used; relying on DATABASE_URL for configuration

func Connect(ctx context.Context) (*sql.DB, error) {
	dsn, err := dsnFromEnv()
	if err != nil {
		return nil, err
	}
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}
	if err := db.PingContext(ctx); err != nil {
		return nil, err
	}
	return db, nil
}
