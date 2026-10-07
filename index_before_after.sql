EXPLAIN (ANALYZE, BUFFERS) SELECT id,user_id,amount,created_at FROM orders WHERE user_id=50000 ORDER BY created_at DESC,id DESC LIMIT 50;
CREATE INDEX idx_orders_user_created ON orders(user_id,created_at DESC,id DESC);
ANALYZE orders;
EXPLAIN (ANALYZE, BUFFERS) SELECT id,user_id,amount,created_at FROM orders WHERE user_id=50000 ORDER BY created_at DESC,id DESC LIMIT 50;
