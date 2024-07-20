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

      const buyPrice = team.price;

      // Find the user
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if user has enough balance
      if (user.balance < buyPrice) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }

      // Update user's balance
      const newBalance = Math.round((user.balance - buyPrice) * 100) / 100;

      // Update team's shares and price
      const newShares = team.shares + 1;
      const newPrice = Math.round((team.price * 1.1) * 100) / 100; // Increase price by 10%

      await db.collection('teams').updateOne(
        { _id: new ObjectId(teamId) },
        { $set: { shares: newShares, price: newPrice } }
      );

      // Update user's portfolio
      const teamInPortfolio = user.portfolio?.find(t => t.teamId.toString() === teamId);
      let updatedPortfolio;

      if (teamInPortfolio) {
        // Increment the number of shares for the existing team
        updatedPortfolio = user.portfolio.map(t => 
          t.teamId.toString() === teamId ? { ...t, shares: t.shares + 1 } : t
        );
      } else {
        // Add the new team to the portfolio
        const newTeam = {
          teamId: new ObjectId(teamId),
          teamName: team.team,
          shares: 1
        };
        updatedPortfolio = user.portfolio ? [...user.portfolio, newTeam] : [newTeam];
      }

      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { portfolio: updatedPortfolio, balance: newBalance } }
      );

      // Add transaction entry
      const transaction = {
        trade: 'buy',
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
          buyPrice,
          newPrice
        },
        shares: 1
      };

      await db.collection('transactions').insertOne(transaction);

      res.status(200).json({ message: 'Team and portfolio updated successfully', newShares, newPrice, newBalance });
    } catch (error) {
      console.error('Error processing buy transaction:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
