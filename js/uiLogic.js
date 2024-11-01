// uiLogic.js

document.addEventListener('DOMContentLoaded', () => {
  // Display tournament name in the headline
  let currentTournamentName = "Select a Tournament";
  const tournamentNameElement = document.getElementById('tournamentName');
  tournamentNameElement.textContent = currentTournamentName;

  const tournamentSelectField = document.getElementById('tournamentSelectField');
  const playerListElement = document.getElementById('playerList');

  // Variables to hold the tournaments and players arrays
  let tournaments = [];
  let players = [];

  // Function to load tournaments data
  async function loadTournaments() {
    try {
      const response = await fetch('http://localhost:3000/api/tournaments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const tournamentsData = await response.json();
      tournaments = tournamentsData.tournaments; // Store the array of tournaments
      return tournaments;
    } catch (error) {
      console.error('Failed to load tournaments:', error);
      tournamentNameElement.textContent = "Failed to load tournaments.";
      return [];
    }
  }

  // Function to load players data
  async function loadPlayers() {
    try {
      const response = await fetch('http://localhost:3000/api/players');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const playersData = await response.json();
      players = playersData.players; // Store the array of players
      return players;
    } catch (error) {
      console.error('Failed to load players:', error);
      return [];
    }
  }

  // Load tournaments and players data in parallel
  Promise.all([loadTournaments(), loadPlayers()]).then(() => {
    if (tournaments.length > 0) {
      populateTournamentSelect(tournaments);
    } else {
      tournamentNameElement.textContent = "No Tournaments Available";
      tournamentSelectField.disabled = true;
    }
  });

  // Function to populate the tournament select field
  function populateTournamentSelect(tournaments) {
    // Clear any existing options
    tournamentSelectField.innerHTML = '';

    // Add a default "Select" option
    const defaultOption = document.createElement('md-select-option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a Tournament --';
    tournamentSelectField.appendChild(defaultOption);

    tournaments.forEach(tournament => {
      const option = document.createElement('md-select-option');
      option.value = tournament.tournament_id;
      option.textContent = tournament.name;
      tournamentSelectField.appendChild(option);
    });
  }

  // Function to handle tournament selection
  function handleTournamentSelection(selectedTournamentId) {
    // Find the selected tournament in the tournaments array
    const selectedTournament = tournaments.find(tournament => tournament.tournament_id == selectedTournamentId);
    if (selectedTournament) {
      tournamentNameElement.textContent = selectedTournament.name;
      currentTournamentName = selectedTournament.name;

      // Get the list of player IDs for the selected tournament
      const playerIds = selectedTournament.players;

      // Filter the players who are in the selected tournament
      const tournamentPlayers = players.filter(player => playerIds.includes(player.player_id));

      // Populate the player list
      populatePlayerList(tournamentPlayers);
    } else {
      tournamentNameElement.textContent = "Select a Tournament";
      // Clear the player list
      playerListElement.innerHTML = '';
    }
  }

  // Function to populate the player list
  function populatePlayerList(tournamentPlayers) {
    // Clear the existing player list
    playerListElement.innerHTML = '';

    if (tournamentPlayers.length === 0) {
      // If no players, display a message
      const listItem = document.createElement('md-list-item');
      listItem.textContent = 'No players registered for this tournament.';
      playerListElement.appendChild(listItem);
      return;
    }

    // Loop through the players and create list items
    tournamentPlayers.forEach(player => {
      const listItem = document.createElement('md-list-item');

      // Create the icon
      const icon = document.createElement('md-icon');
      icon.setAttribute('slot', 'start');
      icon.textContent = player.icon || 'person';

      // Create the headline (player's username)
      const headline = document.createElement('div');
      headline.setAttribute('slot', 'headline');
      headline.textContent = player.username;

      // Create the supporting text (player's statistics)
      const supportingText = document.createElement('div');
      supportingText.setAttribute('slot', 'supporting-text');
      supportingText.textContent = `Wins: ${player.statistics.wins}, Losses: ${player.statistics.losses}, Draws: ${player.statistics.draws}`;

      // Append elements to the list item
      listItem.appendChild(icon);
      listItem.appendChild(headline);
      listItem.appendChild(supportingText);

      // Append the list item to the player list
      playerListElement.appendChild(listItem);
    });
  }

  // Add event listener for selection change
  tournamentSelectField.addEventListener('change', (event) => {
    const selectedTournamentId = event.target.value;
    handleTournamentSelection(selectedTournamentId);
  });
});
