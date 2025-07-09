import 'dotenv/config';
import { Client } from 'pg';

async function getUser(email: string) {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING
  });

  try {
    await client.connect();
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await client.query(query, [email]);

    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]);
      return result.rows[0];
    } else {
      console.log('No user found.');
      return null;
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err;
  } finally {
    await client.end();
  }
}

getUser('user3@example.com').catch(console.error);
