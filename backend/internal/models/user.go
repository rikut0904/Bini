package models

import "time"

type User struct {
	ID        int64     `json:"id"`
	UID       string    `json:"uid"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}
