package models

import "time"

type Challenge struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Level       string    `json:"level"` // easy/medium/hard など
	PhotoURL    string    `json:"photo_url"`
	UserID      int64     `json:"user_id"`
	CreatedAt   time.Time `json:"created_at"`
}
