const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function findUser(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function createUser(username, email, passwordHash) {
  console.log(username)
  console.log(email)
  console.log(passwordHash)
  await pool.query(
    'INSERT INTO users (username, email, passwordhash) VALUES ($1, $2, $3)',
    [username, email, passwordHash]
  );
}

module.exports = {
  findUser,
  createUser,
}