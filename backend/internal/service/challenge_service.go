package service

import (
	"context"

	"github.com/rikut0904/Bini/backend/internal/models"
	"github.com/rikut0904/Bini/backend/internal/repository"
)

type ChallengeService interface {
	List(ctx context.Context) ([]models.Challenge, error)
	Get(ctx context.Context, id int64) (*models.Challenge, error)
	Create(ctx context.Context, in CreateChallengeInput) (*models.Challenge, error)
}

type CreateChallengeInput struct {
	Title       string
	Description string
	Level       string
	UserID      int64
}

type challengeService struct {
	repo repository.ChallengeRepository
}

func NewChallengeService(repo repository.ChallengeRepository) ChallengeService {
	return &challengeService{repo: repo}
}

func (s *challengeService) List(ctx context.Context) ([]models.Challenge, error) {
	return s.repo.List(ctx)
}

func (s *challengeService) Get(ctx context.Context, id int64) (*models.Challenge, error) {
	return s.repo.Get(ctx, id)
}

func (s *challengeService) Create(ctx context.Context, in CreateChallengeInput) (*models.Challenge, error) {
	c := &models.Challenge{
		Title:       in.Title,
		Description: in.Description,
		Level:       in.Level,
		UserID:      in.UserID,
	}
	if err := s.repo.Create(ctx, c); err != nil {
		return nil, err
	}
	return c, nil
}
