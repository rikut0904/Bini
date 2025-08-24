package repository

import (
	"context"
	"database/sql"

	"github.com/rikut0904/Bini/backend/internal/models"
)

type ChallengeRepository interface {
	List(ctx context.Context) ([]models.Challenge, error)
	Get(ctx context.Context, id int64) (*models.Challenge, error)
	Create(ctx context.Context, c *models.Challenge) error
}

type challengeRepository struct {
	db *sql.DB
}

func NewChallengeRepository(db *sql.DB) ChallengeRepository {
	return &challengeRepository{db: db}
}

// メソッド-List
func (r *challengeRepository) List(ctx context.Context) ([]models.Challenge, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, title, description, level, estimated_time, user_id, created_at
		FROM challenges
		ORDER BY id DESC`)
	// challengesテーブルのid, title, description, level, estimated_time, user_id, created_atを抜き出し、idの大きい順に表示
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []models.Challenge
	for rows.Next() {
		var c models.Challenge
		if err := rows.Scan(&c.ID, &c.Title, &c.Description, &c.Level, &c.EstimatedTime, &c.UserID, &c.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

// メソッド-Get
func (r *challengeRepository) Get(ctx context.Context, id int64) (*models.Challenge, error) {
	var c models.Challenge
	err := r.db.QueryRowContext(ctx, `
		SELECT id, title, description, level, estimated_time, user_id, created_at
		FROM challenges WHERE id = $1
	`, id).Scan(&c.ID, &c.Title, &c.Description, &c.Level, &c.EstimatedTime, &c.UserID, &c.CreatedAt)
	// challengesテーブルのid, title, description, level, estimated_time, user_id, created_atをidと一致するものだけを抜き出して表示
	if err != nil {
		return nil, err
	}
	return &c, nil
}

// メソッド-Create
func (r *challengeRepository) Create(ctx context.Context, c *models.Challenge) error {
	return r.db.QueryRowContext(ctx, `
		INSERT INTO challenges (title, description, level, estimated_time, user_id, photo_url)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, created_at
	`, c.Title, c.Description, c.Level, c.EstimatedTime, c.UserID, c.PhotoURL).Scan(&c.ID, &c.CreatedAt)
	// challengesテーブルにtitle, description, level, estimated_time, user_idを追加し、id, created_atを抜き出して表示
}
