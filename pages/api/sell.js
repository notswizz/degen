import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { teamId, userId } = req.body;

    if (!teamId || !userId) {
      return res.status(400).json({ message: 'Team ID and User ID are required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();

      // Find the team
      const team = await db.collection('teams').findOne({ _id: new ObjectId(teamId) });
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }

      // Find the user
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const teamInPortfolio = user.portfolio?.find(t => t.teamId.toString() === teamId);
      if (!teamInPortfolio || teamInPortfolio.shares < 1) {
        return res.status(400).json({ message: 'Insufficient shares to sell' });
      }

      // Calculate sell price and update user's balance
      const sellPrice = team.price;
      const newBalance = Math.round((user.balance + sellPrice) * 100) / 100;

      // Update team's shares and price
      const newShares = team.shares - 1;
      const newPrice = Math.round((team.price * 0.9) * 100) / 100; // Decrease price by 10%

      await db.collection('teams').updateOne(
        { _id: new ObjectId(teamId) },
        { $set: { shares: newShares, price: newPrice } }
      );

      // Update user's portfolio
      let updatedPortfolio;
      if (teamInPortfolio.shares > 1) {
        updatedPortfolio = user.portfolio.map(t =>
          t.teamId.toString() === teamId ? { ...t, shares: t.shares - 1 } : t
        );
      } else {
        updatedPortfolio = user.portfolio.filter(t => t.teamId.toString() !== teamId);
      }

      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { portfolio: updatedPortfolio, balance: newBalance } }
      );

      // Add transaction entry
      const transaction = {
        trade: 'sell',
        timestamp: new Date(),
        user: {
          id: user._id,
          username: user.username
        },
        team: {
          id: team._id,
          name: team.team
        },
        price: {
          sellPrice,
          newPrice
        },
        shares: 1
      };

      await db.collection('transactions').insertOne(transaction);

      res.status(200).json({ message: 'Team and portfolio updated successfully', newShares, newPrice, newBalance });
    } catch (error) {
      console.error('Error processing sell transaction:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};