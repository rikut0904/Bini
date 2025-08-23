-- CREATE TABLE テーブル名(
-- カラム名 データ型 制約
-- )

-- 制約
-- NOT NULL: 必須項目(空値禁止)
-- UNIQUE: 重複不可
-- DEFAULT: デフォルト値
-- PRIMARY KEY: 主キー(テーブル内で一意な値)
-- BIGSERIAL: 64ビットの整数(IDのように自動で連番を振る整数値)

-- Users
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Challenges
CREATE TABLE IF NOT EXISTS challenges (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'easy',
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- helpful index
CREATE INDEX IF NOT EXISTS idx_challenges_user_id ON challenges(user_id);
