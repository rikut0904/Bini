package httpapi

import (
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"

	"github.com/rikut0904/Bini/backend/internal/service"
)

func WriteJSON(w http.ResponseWriter, code int, v any) {
	// ヘッダーにContent-Typeをapplication/json; charset=utf-8に設定する。
	// ステータスコードをcodeに設定する。
	// vがnilでなければ、vをJSONにエンコードしてwに書き込む。
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
		// ユーザーすべて取得
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
		// ユーザー作成
		u, err := svc.Create(r.Context(), req.UID, req.Name)
		if err != nil {
			WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		WriteJSON(w, http.StatusCreated, u)
	})
}

// ---------- Challenges ----------
// challengeCreateRequest is no longer used for JSON decoding, but for clarity,
// we'll keep it as a reference for the expected form fields.
type challengeCreateRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Level       string `json:"level"`
	UserID      int64  `json:"user_id"`
	// PhotoURL will be handled via multipart form
}

const baseURL = "http://localhost:8080/" // Define your base URL here

func ChallengesListHandler(svc service.ChallengeService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// チャレンジすべて取得
		list, err := svc.List(r.Context())
		if err != nil {
			WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}

		// Prepend base URL to PhotoURL for each challenge
		for i := range list {
			if list[i].PhotoURL != "" {
				list[i].PhotoURL = baseURL + list[i].PhotoURL
			}
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
		// チャレンジ取得
		item, err := svc.Get(r.Context(), id)
		if err != nil {
			WriteJSON(w, http.StatusNotFound, map[string]string{"error": err.Error()})
			return
		}

		// Prepend base URL to PhotoURL for the single challenge
		if item.PhotoURL != "" {
			item.PhotoURL = baseURL + item.PhotoURL
		}
		WriteJSON(w, http.StatusOK, item)
	})
}

const uploadDir = "./uploads" // Define upload directory

func ChallengesCreateHandler(svc service.ChallengeService) http.Handler {
	_ = multipart.ErrMessageTooLarge // Force usage of mime/multipart
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Parse multipart form data
		err := r.ParseMultipartForm(32 << 20) // 32MB max memory
		if err != nil {
			WriteJSON(w, http.StatusBadRequest, map[string]string{"error": fmt.Sprintf("failed to parse multipart form: %v", err)})
			return
		}

		title := r.FormValue("title")
		description := r.FormValue("description")
		level := r.FormValue("level")
		userIDStr := r.FormValue("user_id")

		userID, err := strconv.ParseInt(userIDStr, 10, 64)
		if err != nil {
			WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid user_id"})
			return
		}

		var photoURL string
		file, handler, err := r.FormFile("image")
		if err == nil { // File was uploaded
			defer file.Close()

			// Create uploads directory if it doesn't exist
			if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
				err = os.Mkdir(uploadDir, 0755)
				if err != nil {
					WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("failed to create upload directory: %v", err)})
					return
				}
			}

			// Generate unique filename
			ext := filepath.Ext(handler.Filename)
			filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
			filePath := filepath.Join(uploadDir, filename)

			// Save the file
			dst, err := os.Create(filePath)
			if err != nil {
				WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("failed to create file on server: %v", err)})
				return
			}
			defer dst.Close()

			if _, err := io.Copy(dst, file); err != nil {
				WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("failed to save file: %v", err)})
				return
			}
			photoURL = filePath // Store the path
		} else if err != http.ErrMissingFile { // Other error than missing file
			WriteJSON(w, http.StatusBadRequest, map[string]string{"error": fmt.Sprintf("failed to get image file: %v", err)})
			return
		}

		in := service.CreateChallengeInput{
			Title:       title,
			Description: description,
			Level:       level,
			UserID:      userID,
			PhotoURL:    photoURL, // Pass the photo URL
		}

		// チャレンジ作成
		item, err := svc.Create(r.Context(), in)
		if err != nil {
			WriteJSON(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
		WriteJSON(w, http.StatusCreated, item)
	})
}
