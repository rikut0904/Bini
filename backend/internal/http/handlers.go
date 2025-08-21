package httpapi

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/rikut0904/Bini/backend/internal/service"
)

func WriteJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	if v != nil {
		_ = json.NewEncoder(w).Encode(v)
	}
}

// ---------- Users ----------
type userCreateRequest struct {
	UID  string `json:"uid"`
	Name string `json:"name"`
}

func UsersListHandler(svc service.UserService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		users, err := svc.List(r.Context())
		if err != nil {
			WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		WriteJSON(w, http.StatusOK, users)
	})
}

func UsersCreateHandler(svc service.UserService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var req userCreateRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid json"})
			return
		}
		u, err := svc.Create(r.Context(), req.UID, req.Name)
		if err != nil {
			WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		WriteJSON(w, http.StatusCreated, u)
	})
}

// ---------- Challenges ----------
type challengeCreateRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Level       string `json:"level"`
	UserID      int64  `json:"user_id"`
}

func ChallengesListHandler(svc service.ChallengeService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		list, err := svc.List(r.Context())
		if err != nil {
			WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		WriteJSON(w, http.StatusOK, list)
	})
}

func ChallengesGetHandler(svc service.ChallengeService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idStr := chi.URLParam(r, "id")
		id, err := strconv.ParseInt(idStr, 10, 64)
		if err != nil {
			WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid id"})
			return
		}
		item, err := svc.Get(r.Context(), id)
		if err != nil {
			WriteJSON(w, http.StatusNotFound, map[string]string{"error": err.Error()})
			return
		}
		WriteJSON(w, http.StatusOK, item)
	})
}

func ChallengesCreateHandler(svc service.ChallengeService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var req challengeCreateRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid json"})
			return
		}
		in := service.CreateChallengeInput{
			Title:       req.Title,
			Description: req.Description,
			Level:       req.Level,
			UserID:      req.UserID,
		}
		item, err := svc.Create(r.Context(), in)
		if err != nil {
			WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		WriteJSON(w, http.StatusCreated, item)
	})
}
