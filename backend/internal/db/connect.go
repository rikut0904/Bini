package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

// DATABASE_URL があればそれを優先（Railway想定）。なければ個別のPG*環境変数から組み立て。
func dsnFromEnv() (string, error) {
	if url := os.Getenv("DATABASE_URL"); url != "" {
		// 例: postgres://user:pass@host:port/dbname?sslmode=require
		return url, nil
	}
	host := envOr("PGHOST", "db")
	port := envOr("PGPORT", "5432")
	user := envOr("PGUSER", "postgres")
	pass := envOr("PGPASSWORD", "postgres")
	name := envOr("PGDATABASE", "bini")
	ssl := envOr("PGSSLMODE", "disable") // ローカルはdisable
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s", user, pass, host, port, name, ssl), nil
}

func envOr(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}

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
