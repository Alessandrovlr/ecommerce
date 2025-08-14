import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.db,
  ssl: {
    rejectUnauthorized: false
  },
});

export default pool;
