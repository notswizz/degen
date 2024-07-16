import clientPromise from './lib/mongodb.js';

const nflTeams = [
  'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills',
  'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns',
  'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers',
  'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs',
  'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins',
  'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants',
  'New York Jets', 'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers',
  'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders'
];

async function insertNflTeams() {
  try {
    const client = await clientPromise;
    const db = client.db('nflDatabase'); // Replace with your database name
    const collection = db.collection('teams');

    const teamsData = nflTeams.map(team => ({
      name: team,
      price: 1,
      shares: 0
    }));

    const result = await collection.insertMany(teamsData);
    console.log(`${result.insertedCount} teams inserted`);
  } catch (error) {
    console.error('Error inserting teams:', error);
  } finally {
    // No need to close the client here because we are reusing the client from your existing setup
  }
}

insertNflTeams();
