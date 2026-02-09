import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  // 1. Check and grab the variable
  const { DATABASE_URL } = process.env;

  if (!DATABASE_URL) {
    return res.status(500).json({ error: 'Missing Database Connection String' });
  }

  // 2. Initialize SQL connection ONCE (using the checked variable)
  const sql = neon(DATABASE_URL);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Phone number required' });
  }

  try {
    // 3. Use the 'sql' client we created above. 
    // DO NOT run neon(process.env...) again here.
    await sql`INSERT INTO waitlist (whatsapp_number) VALUES (${phone})`;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
}