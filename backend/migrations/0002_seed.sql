-- seed users
INSERT INTO users (uid, name)
VALUES
  ('demo-uid-001', 'Demo User 1'),
  ('demo-uid-002', 'Demo User 2')
ON CONFLICT (uid) DO NOTHING;

-- seed challenges
INSERT INTO challenges (title, description, level, user_id)
SELECT '10分だけ読書', '短時間で読書習慣をつけるミニチャレンジ', 'easy', u.id
FROM users u WHERE u.uid = 'demo-uid-001'
ON CONFLICT DO NOTHING;

INSERT INTO challenges (title, description, level, user_id)
SELECT '新レシピを作る', '冷蔵庫の食材で新しい一品に挑戦', 'medium', u.id
FROM users u WHERE u.uid = 'demo-uid-002'
ON CONFLICT DO NOTHING;
