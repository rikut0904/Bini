package repository

import (
	"context"
	"database/sql"

	"github.com/rikut0904/Bini/backend/internal/models"
)

type UserRepository interface {
	List(ctx context.Context) ([]models.User, error)
	Create(ctx context.Context, u *models.User) error
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{db: db}
}

// メソッド-List
func (r *userRepository) List(ctx context.Context) ([]models.User, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, uid, name, created_at
		FROM users
		ORDER BY id DESC`)
	// usersテーブルのid, uid, name, created_atを抜き出し、idの大きい順に表示
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []models.User{}
	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.UID, &u.Name, &u.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, u)
	}
	return out, rows.Err()
}

// メソッド-Create
func (r *userRepository) Create(ctx context.Context, u *models.User) error {
	return r.db.QueryRowContext(ctx, `
		INSERT INTO users (uid, name)
		VALUES ($1, $2)
		RETURNING id, created_at
	`, u.UID, u.Name).Scan(&u.ID, &u.CreatedAt)
	// usersテーブルにuid, nameを追加し、id, created_atを抜き出して表示
}
