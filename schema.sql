CREATE TABLE users (id BIGSERIAL PRIMARY KEY,name TEXT NOT NULL);
CREATE TABLE orders (id BIGSERIAL PRIMARY KEY,user_id BIGINT NOT NULL REFERENCES users(id),amount NUMERIC(10,2) NOT NULL,created_at TIMESTAMPTZ NOT NULL);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at_id ON orders(created_at DESC,id DESC);
