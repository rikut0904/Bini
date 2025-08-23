package service

import (
	"context"

	"github.com/rikut0904/Bini/backend/internal/models"
	"github.com/rikut0904/Bini/backend/internal/repository"
)

type UserService interface {
	List(ctx context.Context) ([]models.User, error)
	Create(ctx context.Context, uid, name string) (*models.User, error)
}

type userService struct {
	repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) UserService {
	return &userService{repo: repo}
}

// メソッド-List
func (s *userService) List(ctx context.Context) ([]models.User, error) {
	return s.repo.List(ctx)
}

// メソッド-Create
func (s *userService) Create(ctx context.Context, uid, name string) (*models.User, error) {
	u := &models.User{UID: uid, Name: name}
	if err := s.repo.Create(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}
