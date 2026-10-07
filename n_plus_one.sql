-- Bad pattern: one user query plus one COUNT query per user.
SELECT id,name FROM users LIMIT 100;
-- Fix with one query:
SELECT u.id,u.name,COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON o.user_id=u.id GROUP BY u.id,u.name ORDER BY u.id LIMIT 100;
