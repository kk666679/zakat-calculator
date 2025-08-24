const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_n4QNfxj7WIht@ep-broad-glade-a1ycfc41-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) throw err;
  console.log('Connected:', res.rows[0]);
  pool.end();
});
