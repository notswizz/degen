import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { userId } = req.query;

    console.log("Received GET request to /api/balance with userId:", userId);

    if (!userId) {
      console.error("User ID is required but not provided");
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      console.log("Connected to MongoDB");

      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (!user) {
        console.error("User not found with userId:", userId);
        return res.status(404).json({ message: 'User not found' });
      }

      const balance = user.balance?.$numberInt || user.balance || 0;
      console.log("User found:", user);
      res.status(200).json({ balance });
    } catch (error) {
      console.error("Error fetching user balance:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    console.error(`Method ${req.method} not allowed`);
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
