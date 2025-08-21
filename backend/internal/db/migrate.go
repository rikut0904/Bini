package db

import (
	"context"
	"database/sql"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// 非破壊のIF NOT EXISTS前提のシンプル実行
func Migrate(ctx context.Context, db *sql.DB, dir string) error {
	entries := []string{}
	err := filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() && strings.HasSuffix(d.Name(), ".sql") {
			entries = append(entries, path)
		}
		return nil
	})
	if err != nil {
		return fmt.Errorf("walk migrations: %w", err)
	}

	sort.Strings(entries)
	for _, p := range entries {
		b, err := os.ReadFile(p)
		if err != nil {
			return fmt.Errorf("read %s: %w", p, err)
		}
		if _, err := db.ExecContext(ctx, string(b)); err != nil {
			return fmt.Errorf("exec %s: %w", p, err)
		}
	}
	return nil
}
