import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db();

      const transactions = await db.collection('transactions').find({}).toArray();

      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
