import pg from "pg";
const { Client } = pg;
const client = new Client({ connectionString: process.env.DATABASE_URL });
async function explain(label,query,params=[]){const r=await client.query(`EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${query}`,params);const p=r.rows[0]["QUERY PLAN"][0];console.log(`\n=== ${label} ===`);console.log(`Execution Time: ${p["Execution Time"]} ms`);console.log(`Planning Time: ${p["Planning Time"]} ms`);}
async function benchmark(){await client.connect();await explain("Indexed user lookup",`SELECT * FROM orders WHERE user_id=50000 ORDER BY created_at DESC,id DESC LIMIT 50`);await explain("Deep OFFSET pagination",`SELECT id,user_id,amount,created_at FROM orders ORDER BY created_at DESC,id DESC LIMIT 50 OFFSET 900000`);await explain("Cursor / keyset pagination",`SELECT id,user_id,amount,created_at FROM orders WHERE (created_at,id)<($1,$2) ORDER BY created_at DESC,id DESC LIMIT 50`,[new Date().toISOString(),999999999]);await client.end();}
benchmark().catch(async e=>{console.error(e);await client.end().catch(()=>{});process.exit(1);});
