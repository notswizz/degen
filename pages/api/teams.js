// pages/api/teams.js
import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('teams');

  switch (req.method) {
    case 'GET':
      try {
        const teams = await collection.find({}).toArray();
        res.status(200).json(teams);
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        const { team, logo, shares, price } = req.body;
        await collection.insertOne({ team, logo, shares, price });
        res.status(200).json({ message: 'Team added successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};
