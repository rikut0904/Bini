package httpapi

import (
	"database/sql"
	"net/http"
    "os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"

    "github.com/rikut0904/Bini/backend/internal/auth"
	"github.com/rikut0904/Bini/backend/internal/repository"
	"github.com/rikut0904/Bini/backend/internal/service"
)

func NewRouter(db *sql.DB) http.Handler {
	r := chi.NewRouter()

    allowedOrigins := os.Getenv("CORS_ALLOWED_ORIGINS")
    if allowedOrigins == "" {
        allowedOrigins = "*"
    }
    r.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{allowedOrigins},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

    // DI
	userRepo := repository.NewUserRepository(db)
	chRepo := repository.NewChallengeRepository(db)
	userSvc := service.NewUserService(userRepo)
	chSvc := service.NewChallengeService(chRepo)

	r.Get("/healthz", func(w http.ResponseWriter, _ *http.Request) {
		WriteJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

    if issuer := os.Getenv("AUTH0_DOMAIN"); issuer != "" {
        aud := os.Getenv("AUTH0_AUDIENCE")
        if mw, err := auth.NewAuthMiddleware(issuer, aud); err == nil {
            r.Group(func(pr chi.Router) {
                pr.Use(mw)
                pr.Method("GET", "/users", UsersListHandler(userSvc))
                pr.Method("GET", "/challenges", ChallengesListHandler(chSvc))
                pr.Method("GET", "/challenges/{id}", ChallengesGetHandler(chSvc))
                pr.Method("GET", "/me/challenges", ChallengesListHandler(chSvc))
            })
            r.Method("POST", "/users", UsersCreateHandler(userSvc))
            r.Method("POST", "/challenges", ChallengesCreateHandler(chSvc))
        }
    } else {
        r.Method("GET", "/users", UsersListHandler(userSvc))
        r.Method("POST", "/users", UsersCreateHandler(userSvc))
        r.Method("GET", "/challenges", ChallengesListHandler(chSvc))
        r.Method("POST", "/challenges", ChallengesCreateHandler(chSvc))
        r.Method("GET", "/challenges/{id}", ChallengesGetHandler(chSvc))
    }

	return r
}
