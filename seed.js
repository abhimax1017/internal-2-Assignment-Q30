import pg from "pg";
const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });
async function seed(){
 await client.connect();
 await client.query(`DROP TABLE IF EXISTS orders; DROP TABLE IF EXISTS users;
 CREATE TABLE users (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL);
 CREATE TABLE orders (id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id), amount NUMERIC(10,2) NOT NULL, created_at TIMESTAMPTZ NOT NULL);`);
 console.log("Creating 100,000 users...");
 await client.query(`INSERT INTO users(name) SELECT 'User '||gs FROM generate_series(1,100000) gs;`);
 console.log("Creating 1,000,000 orders...");
 await client.query(`INSERT INTO orders(user_id,amount,created_at) SELECT floor(random()*100000+1)::BIGINT, round((random()*1000)::numeric,2), NOW()-(random()*interval '365 days') FROM generate_series(1,1000000);`);
 await client.query("ANALYZE users; ANALYZE orders;");
 console.log("Seeded 100,000 users and 1,000,000 orders.");
 await client.end();
}
seed().catch(async e=>{console.error(e);await client.end().catch(()=>{});process.exit(1);});
