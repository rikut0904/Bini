package auth

import (
    "context"
    "errors"
    "net/http"
    "os"
    "strings"
    "time"

    "github.com/coreos/go-oidc/v3/oidc"
)

 type contextKey string

const (
    ContextKeyToken  contextKey = "auth.token"
    ContextKeyClaims contextKey = "auth.claims"
)

 type Claims struct {
    Sub string      `json:"sub"`
    Aud interface{} `json:"aud"`
    Iss string      `json:"iss"`
    Exp int64       `json:"exp"`
}

 func NewAuthMiddleware(issuerDomain, audience string) (func(http.Handler) http.Handler, error) {
    if issuerDomain == "" || audience == "" {
        return nil, errors.New("issuer domain or audience is empty")
    }

    issuer := issuerDomain
    if !strings.HasPrefix(issuer, "http") {
        issuer = "https://" + issuer
    }
    if !strings.HasSuffix(issuer, "/") {
        issuer += "/"
    }

    provider, err := oidc.NewProvider(context.Background(), issuer)
    if err != nil {
        return nil, err
    }

    verifier := provider.Verifier(&oidc.Config{SkipClientIDCheck: true})

    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            authz := r.Header.Get("Authorization")
            if authz == "" || !strings.HasPrefix(authz, "Bearer ") {
                http.Error(w, "missing bearer token", http.StatusUnauthorized)
                return
            }
            raw := strings.TrimPrefix(authz, "Bearer ")

            idToken, err := verifier.Verify(r.Context(), raw)
            if err != nil {
                http.Error(w, "invalid token", http.StatusUnauthorized)
                return
            }

            var claims Claims
            if err := idToken.Claims(&claims); err != nil {
                http.Error(w, "invalid claims", http.StatusUnauthorized)
                return
            }

            if claims.Exp > 0 && time.Unix(claims.Exp, 0).Before(time.Now().Add(-1*time.Minute)) {
                http.Error(w, "token expired", http.StatusUnauthorized)
                return
            }

            if !audContains(claims.Aud, audience) {
                http.Error(w, "invalid audience", http.StatusUnauthorized)
                return
            }

            ctx := context.WithValue(r.Context(), ContextKeyToken, raw)
            ctx = context.WithValue(ctx, ContextKeyClaims, claims)
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }, nil
}

func audContains(aud interface{}, want string) bool {
    switch v := aud.(type) {
    case string:
        return v == want
    case []interface{}:
        for _, it := range v {
            if s, ok := it.(string); ok && s == want {
                return true
            }
        }
    case []string:
        for _, s := range v {
            if s == want {
                return true
            }
        }
    }
    return false
}

 func envOr(key, def string) string {
    if v := os.Getenv(key); v != "" {
        return v
    }
    return def
}
