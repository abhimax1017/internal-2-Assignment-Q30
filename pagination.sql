EXPLAIN (ANALYZE, BUFFERS) SELECT id,user_id,amount,created_at FROM orders ORDER BY created_at DESC,id DESC LIMIT 50 OFFSET 900000;
EXPLAIN (ANALYZE, BUFFERS) SELECT id,user_id,amount,created_at FROM orders WHERE (created_at,id)<('2026-01-01T00:00:00+00',900000) ORDER BY created_at DESC,id DESC LIMIT 50;
