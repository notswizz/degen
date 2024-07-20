import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection('users').findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('users').insertOne({
      username,
      email,
      password: hashedPassword,
      balance: 0, // Set initial balance to 0
    });

    return res.status(201).json({ message: 'User registered' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
