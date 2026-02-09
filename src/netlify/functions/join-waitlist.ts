import { neon } from '@neondatabase/serverless';

export const handler = async (event: any) => {
  // 1. Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // 2. Parse the incoming body (Netlify passes body as a string)
  let phone;
  try {
    const body = JSON.parse(event.body);
    phone = body.phone;
  } catch (e) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  if (!phone) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Phone number required' }) };
  }

  // 3. Connect to Database
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    return { statusCode: 500, body: 'Missing Database Connection String' };
  }

  try {
    const sql = neon(DATABASE_URL);
    await sql`INSERT INTO waitlist (whatsapp_number) VALUES (${phone})`;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error' }),
    };
  }
};