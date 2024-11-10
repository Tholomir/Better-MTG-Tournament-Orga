// server.js
// Run the server with Node: command: node server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // For ETag generation
const compression = require('compression');
const morgan = require('morgan'); // Optional: For logging

const app = express();
const PORT = 3000; // You can change this if needed

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'cache-control'],
  })
);

app.use(bodyParser.json());

// Use compression middleware
app.use(compression());

// Use morgan for HTTP request logging
app.use(morgan('combined'));

// Paths to JSON files
const playersFilePath = path.join(__dirname, 'data', 'Players.JSON');
const tournamentsFilePath = path.join(__dirname, 'data', 'Tournaments.JSON');
const matchesFilePath = path.join(__dirname, 'data', 'Matches.JSON'); // If needed

/**
 * Helper function to read JSON files.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<Object>} - Parsed JSON data.
 */
const readJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path.basename(filePath)}:`, err);
        return reject(new Error('Internal Server Error'));
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        console.error(`Error parsing ${path.basename(filePath)}:`, parseError);
        reject(new Error('Internal Server Error'));
      }
    });
  });
};

/**
 * Helper function to write JSON files.
 * @param {string} filePath - The path to the JSON file.
 * @param {Object} data - The data to write.
 * @returns {Promise<void>}
 */
const writeJSONFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      'utf8',
      (writeErr) => {
        if (writeErr) {
          console.error(`Error writing to ${path.basename(filePath)}:`, writeErr);
          return reject(new Error('Internal Server Error'));
        }
        resolve();
      }
    );
  });
};

/**
 * Helper function to generate ETag based on file's last modified time.
 * @returns {string} - The generated ETag.
 */
const generateETag = () => {
  const stats = fs.statSync(playersFilePath);
  return stats.mtimeMs.toString();
};

// -------------------- In-Memory Cache Initialization --------------------

let playersCache = [];
let playersEtag = '';

const loadPlayersIntoCache = async () => {
  try {
    const playersData = await readJSONFile(playersFilePath);
    playersCache = playersData.players.map(player => ({
      ...player,
      player_id: Number(player.player_id),
    }));
    playersEtag = generateETag();
    console.log('Players data loaded into in-memory cache.');
  } catch (error) {
    console.error('Failed to load players into cache:', error);
  }
};

// Load players into cache on server start
loadPlayersIntoCache();

// -------------------- Players Endpoints --------------------

// Endpoint to get all players with caching
app.get('/api/players', async (req, res) => {
  try {
    // Check for If-None-Match header
    if (req.headers['if-none-match'] === playersEtag) {
      return res.status(304).end(); // Not Modified
    }

    // Set Cache-Control and ETag headers
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.setHeader('ETag', playersEtag);

    // Serve players from cache
    res.status(200).json({ players: playersCache });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to add a new player
app.post('/api/players', async (req, res) => {
  const newPlayer = req.body;

  // Basic validation
  if (!newPlayer.username || !newPlayer.full_name || !newPlayer.icon) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Assign player_id
    const nextPlayerId =
      playersCache.length > 0 ? playersCache[playersCache.length - 1].player_id + 1 : 1;
    newPlayer.player_id = nextPlayerId;

    // Set registration_date and initialize fields
    newPlayer.registration_date = new Date().toISOString();
    newPlayer.statistics = {
      total_matches: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      game_win_percentage: 0.0,
    };
    newPlayer.achievements = [];

    // Add to in-memory cache
    playersCache.push(newPlayer);

    // Regenerate ETag
    playersEtag = generateETag();

    // Also write to Players.JSON
    const playersData = { players: playersCache };
    await writeJSONFile(playersFilePath, playersData);

    res.status(201).json({ message: 'Player added successfully', player: newPlayer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to delete a player
app.delete('/api/players/:id', async (req, res) => {
  const playerId = parseInt(req.params.id, 10);

  try {
    // Find the player in cache
    const playerIndex = playersCache.findIndex(player => player.player_id === playerId);

    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Remove from cache
    playersCache.splice(playerIndex, 1);

    // Regenerate ETag
    playersEtag = generateETag();

    // Write updated cache back to Players.JSON
    const playersData = { players: playersCache };
    await writeJSONFile(playersFilePath, playersData);

    // Remove player from all tournaments
    const tournamentsData = await readJSONFile(tournamentsFilePath);
    let tournaments = tournamentsData.tournaments;
    let tournamentsUpdated = false;

    tournaments.forEach(tournament => {
      const index = tournament.players.indexOf(playerId);
      if (index !== -1) {
        tournament.players.splice(index, 1);
        tournamentsUpdated = true;
        console.log(`Removed Player ID ${playerId} from Tournament ID ${tournament.tournament_id}`);
      }
    });

    if (tournamentsUpdated) {
      await writeJSONFile(tournamentsFilePath, tournamentsData);
      console.log(`Player ID ${playerId} removed from tournaments.`);
    }

    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------- Tournaments Endpoints --------------------

// Endpoint to get all tournaments with caching
app.get('/api/tournaments', async (req, res) => {
  try {
    const tournamentsData = await readJSONFile(tournamentsFilePath);
    const etag = generateETag(tournamentsData);

    // Check for If-None-Match header
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end(); // Not Modified
    }

    // Set Cache-Control and ETag headers
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.setHeader('ETag', etag);

    res.status(200).json(tournamentsData); // Ensure status is 200
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to create a new tournament
app.post('/api/tournaments', async (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name || typeof name !== 'string') {
    return res
      .status(400)
      .json({ message: 'Tournament name is required and must be a string.' });
  }

  try {
    const tournamentsData = await readJSONFile(tournamentsFilePath);
    const tournaments = tournamentsData.tournaments;

    // Determine the next tournament_id
    const nextTournamentId =
      tournaments.length > 0
        ? tournaments[tournaments.length - 1].tournament_id + 1
        : 101; // Starting ID as per your example

    // Create new tournament object
    const newTournament = {
      tournament_id: nextTournamentId,
      name: name.trim(),
      created_at: new Date().toISOString(),
      start_date: new Date().toISOString(), // Adjust as needed
      end_date: new Date().toISOString(), // Adjust as needed
      rounds: 0,
      status: 'Upcoming',
      current_round: 0,
      players: [],
    };

    // Add the new tournament to the array
    tournaments.push(newTournament);

    // Write back to Tournaments.JSON
    await writeJSONFile(tournamentsFilePath, tournamentsData);

    res.status(201).json(newTournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to delete a tournament
app.delete('/api/tournaments/:id', async (req, res) => {
  const tournamentId = parseInt(req.params.id, 10);

  try {
    const tournamentsData = await readJSONFile(tournamentsFilePath);
    let tournaments = tournamentsData.tournaments;

    // Find the index of the tournament to be deleted
    const tournamentIndex = tournaments.findIndex(
      (tournament) => tournament.tournament_id === tournamentId
    );

    if (tournamentIndex === -1) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    // Remove the tournament from the array
    tournaments.splice(tournamentIndex, 1);

    // Write the updated data back to Tournaments.JSON
    await writeJSONFile(tournamentsFilePath, tournamentsData);

    res.json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to update tournament details
app.put('/api/tournaments/:id', async (req, res) => {
  const tournamentId = parseInt(req.params.id, 10);
  const updatedDetails = req.body;

  try {
    const tournamentsData = await readJSONFile(tournamentsFilePath);
    const tournaments = tournamentsData.tournaments;

    // Find the tournament to update
    const tournamentIndex = tournaments.findIndex(
      (t) => t.tournament_id === tournamentId
    );

    if (tournamentIndex === -1) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    // Update the tournament details
    tournaments[tournamentIndex] = {
      ...tournaments[tournamentIndex],
      ...updatedDetails,
    };

    // Write the updated data back to Tournaments.JSON
    await writeJSONFile(tournamentsFilePath, tournamentsData);

    res.json(tournaments[tournamentIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to update tournament players (PUT)
app.put('/api/tournaments/:tournamentId/players', async (req, res) => {
  const tournamentId = parseInt(req.params.tournamentId, 10);
  const { players } = req.body;

  // Validate the data
  if (!Array.isArray(players)) {
    return res
      .status(400)
      .json({ message: 'Players must be an array of player IDs.' });
  }

  try {
    const tournamentsData = await readJSONFile(tournamentsFilePath);
    const tournaments = tournamentsData.tournaments;

    // Find the tournament to update
    const tournament = tournaments.find(
      (t) => t.tournament_id === tournamentId
    );

    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    // Optional: Validate that all player IDs exist
    const playersData = await readJSONFile(playersFilePath);
    const allPlayerIds = playersData.players.map((player) => player.player_id);
    const invalidPlayerIds = players.filter(
      (id) => !allPlayerIds.includes(id)
    );

    if (invalidPlayerIds.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid player IDs: ${invalidPlayerIds.join(', ')}` });
    }

    // Update the players array
    tournament.players = players.map(id => Number(id));

    // Write the updated data back to Tournaments.JSON
    await writeJSONFile(tournamentsFilePath, tournamentsData);

    res.json({
      message: 'Tournament players updated successfully.',
      players: tournament.players,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -------------------- Additional Endpoints (Matches) --------------------

// If you have Match management, implement similar endpoints here

// --------------------------------------------------------------------

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
