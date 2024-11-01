// server.js
// run the server.js with Node => command: node server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000; // You can change this if needed

// Middleware
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

app.use(bodyParser.json());

// Path to Players.JSON
const playersFilePath = path.join(__dirname, 'data', 'Players.JSON');

// Path to Tournaments.JSON
const tournamentsFilePath = path.join(__dirname, 'data', 'Tournaments.JSON');

// Endpoint to get all players
app.get('/api/players', (req, res) => {
  fs.readFile(playersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Players.JSON:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    try {
      const playersData = JSON.parse(data);
      res.json(playersData); // Return the entire players data
    } catch (parseError) {
      console.error('Error parsing Players.JSON:', parseError);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

// Endpoint to add a new player
app.post('/api/players', (req, res) => {
  const newPlayer = req.body;

  // Basic validation
  if (!newPlayer.username || !newPlayer.full_name || !newPlayer.icon) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  fs.readFile(playersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Players.JSON:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
      const playersData = JSON.parse(data);
      const players = playersData.players;

      // Determine the next player_id
      const nextPlayerId = players.length > 0 ? players[players.length - 1].player_id + 1 : 1;
      newPlayer.player_id = nextPlayerId;

      // Set registration_date to current date and time
      newPlayer.registration_date = new Date().toISOString();

      // Initialize statistics and achievements
      newPlayer.statistics = {
        total_matches: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        game_win_percentage: 0.0
      };
      newPlayer.achievements = [];

      // Add the new player to the array
      players.push(newPlayer);

      // Write the updated data back to Players.JSON
      fs.writeFile(playersFilePath, JSON.stringify(playersData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to Players.JSON:', writeErr);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'Player added successfully', player: newPlayer });
      });
    } catch (parseError) {
      console.error('Error parsing Players.JSON:', parseError);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

// Endpoint to delete a player
app.delete('/api/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id);

  fs.readFile(playersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Players.JSON:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
      const playersData = JSON.parse(data);
      let players = playersData.players;

      // Find the index of the player to be deleted
      const playerIndex = players.findIndex(player => player.player_id === playerId);

      if (playerIndex === -1) {
        return res.status(404).json({ message: 'Player not found' });
      }

      // Remove the player from the array
      players.splice(playerIndex, 1);

      // Write the updated data back to Players.JSON
      fs.writeFile(playersFilePath, JSON.stringify(playersData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing to Players.JSON:', writeErr);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.json({ message: 'Player deleted successfully' });
      });
    } catch (parseError) {
      console.error('Error parsing Players.JSON:', parseError);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});


// Endpoint to get all tournaments
app.get('/api/tournaments', (req, res) => {
  fs.readFile(tournamentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading Tournaments.JSON:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    try {
      const tournamentsData = JSON.parse(data);
      res.json(tournamentsData); // Return the entire tournaments data
    } catch (parseError) {
      console.error('Error parsing Tournaments.JSON:', parseError);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin);
    if (['http://localhost:5500', 'http://127.0.0.1:5500'].includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

