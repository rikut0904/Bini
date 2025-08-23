package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"
    "strings"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func Connect(ctx context.Context) (*sql.DB, error) {
    // dsnは正常時、[postgres://{user}:{pass}@{host}:{port}/{name}?sslmode={ssl}]の形式で変換され、errが[null]として返答される。
    // エラー時には[""]で返答され、errは[database configuration missing. Set DATABASE_URL or PGHOST/PGUSER/PGPASSWORD/PGDATABASE]として返答される。
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

func dsnFromEnv() (string, error) {
    if url := envFirstNonEmpty("DATABASE_URL", "POSTGRES_URL", "POSTGRESQL_URL"); url != "" {
        return url, nil
    }

    host := os.Getenv("PGHOST")
    port := envOr("PGPORT", "5432")
    user := envOr("PGUSER", "postgres")
    pass := os.Getenv("PGPASSWORD")
    if pass == "" {
        if pf := os.Getenv("PGPASSWORD_FILE"); pf != "" {
            if b, err := os.ReadFile(pf); err == nil {
                pass = strings.TrimSpace(string(b))
            }
        }
    }
    name := envOr("PGDATABASE", "postgres")
    ssl := envOr("PGSSLMODE", "require")

    if host == "" || user == "" || pass == "" || name == "" {
        return "", fmt.Errorf("database configuration missing. Set DATABASE_URL or PGHOST/PGUSER/PGPASSWORD/PGDATABASE")
    }
    return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s", user, pass, host, port, name, ssl), nil
}

func envFirstNonEmpty(keys ...string) string {
    for _, k := range keys {
        if v := os.Getenv(k); v != "" {
            return v
        }
    }
    return ""
}

func envOr(k, def string) string {
    if v := os.Getenv(k); v != "" {
        return v
    }
    return def
}
