import express from 'express';
import { Client } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 4000;

const client = new Client({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: true
})

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err));

app.get('/', (req, res) => {
  res.send('Hello, This is from the backend');
});

app.get('/add-user', async (_req, res) => {
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    )`);

    await client.query(`INSERT INTO users (name) VALUES ('Yinka')`);
    res.send('User added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add user');
  }
});

app.get('/users', async (_req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch users');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});