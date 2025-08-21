package models

import "time"

type User struct {
	ID        int64     `json:"id"`
	UID       string    `json:"uid"` // Firebase UID等を保存する想定
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}
