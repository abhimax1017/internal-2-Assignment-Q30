# Assignment 30 – Database Performance

This project demonstrates indexing, the N+1 query problem, pagination, and connection pooling using PostgreSQL and Node.js.

## Run
npm install

Set DATABASE_URL, then:

npm run seed
npm run benchmark

The seed creates 100,000 users and 1,000,000 orders. Run the SQL files in PostgreSQL and record the real EXPLAIN ANALYZE timings. Do not fabricate benchmark numbers.
