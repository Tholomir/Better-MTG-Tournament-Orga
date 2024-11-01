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
  let currentSelectedTournament = null; // Track the currently selected tournament

  // Select elements for adding a player
  const addPlayerButton = document.getElementById('addPlayerButton');
  const addPlayerDialog = document.getElementById('addPlayerDialog');
  const usernameField = document.getElementById('usernameField');
  const fullNameField = document.getElementById('fullNameField');
  const iconSelectField = document.getElementById('iconSelectField');
  const confirmAddPlayerButton = document.getElementById('confirmAddPlayerButton');

  // Select elements for removing a player
  const removePlayerButton = document.getElementById('removePlayerButton');
  const removePlayerDialog = document.getElementById('removePlayerDialog');
  const removePlayerList = document.getElementById('removePlayerList');

  // Event listener to open the dialog
  addPlayerButton.addEventListener('click', () => {
    addPlayerDialog.show();
  });

  // Event listener to open the remove player dialog
  removePlayerButton.addEventListener('click', () => {
    populateRemovePlayerList();
    removePlayerDialog.show();
  });

  // Handle dialog confirmation
  confirmAddPlayerButton.addEventListener('click', async () => {
    // Validate form inputs
    const username = usernameField.value.trim();
    const fullName = fullNameField.value.trim();
    const icon = iconSelectField.value;

    if (!username || !fullName || !icon) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare new player data (excluding player_id and registration_date)
    const newPlayer = {
      username: username,
      full_name: fullName,
      icon: icon
    };

    try {
      // Send POST request to add the new player
      const response = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlayer)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add player');
      }

      const responseData = await response.json();
      console.log('Player added:', responseData.player);

      // Update the players array with the new player
      players.push(responseData.player);

      // Update the player list UI
      if (currentSelectedTournament) {
        const playerIds = currentSelectedTournament.players;
        const tournamentPlayers = players.filter(player => playerIds.includes(player.player_id));
        populatePlayerList(tournamentPlayers);
      } else {
        populatePlayerList(players);
      }

      // Clear form fields
      usernameField.value = '';
      fullNameField.value = '';
      iconSelectField.value = '';

      // Close the dialog
      addPlayerDialog.close();
    } catch (error) {
      console.error('Error adding player:', error);
      alert(`Error adding player: ${error.message}`);
    }
  });

      // Function to populate the remove player list
  function populateRemovePlayerList() {
    // Clear the existing list
    removePlayerList.innerHTML = '';
  
    // Loop through the players and create list items
    players.forEach(player => {
      const listItem = document.createElement('md-list-item');
  
      // Create the headline (player's username)
      const headline = document.createElement('div');
      headline.setAttribute('slot', 'headline');
      headline.textContent = player.username;
  
      // Create the delete icon button
      const deleteButton = document.createElement('md-icon-button');
      deleteButton.setAttribute('slot', 'end'); // Align to the end
      deleteButton.setAttribute('aria-label', 'Delete Player');
      deleteButton.innerHTML = '<md-icon>delete_forever</md-icon>';
  
      // Add event listener to the delete button
      deleteButton.addEventListener('click', () => {
        confirmDeletePlayer(player);
      });
  
      // Append elements to the list item
      listItem.appendChild(headline);
      listItem.appendChild(deleteButton);
  
      // Append the list item to the remove player list
      removePlayerList.appendChild(listItem);
    });
  }

  // Function to confirm player deletion
  function confirmDeletePlayer(player) {
    const confirmation = confirm(`Are you sure you want to delete ${player.username}? This action cannot be undone.`);
    if (confirmation) {
      deletePlayer(player.player_id);
    }
  }
  
  // Function to delete player
  async function deletePlayer(playerId) {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`http://localhost:3000/api/players/${playerId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete player');
      }
  
      // Remove the player from the players array
      players = players.filter(player => player.player_id !== playerId);
  
      // Update the player list UI
      if (currentSelectedTournament) {
        const playerIds = currentSelectedTournament.players;
        const tournamentPlayers = players.filter(player => playerIds.includes(player.player_id));
        populatePlayerList(tournamentPlayers);
      } else {
        populatePlayerList(players);
      }
  
      // Refresh the remove player list
      populateRemovePlayerList();
  
      alert('Player deleted successfully.');
    } catch (error) {
      console.error('Error deleting player:', error);
      alert(`Error deleting player: ${error.message}`);
    }
  }
  


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

    // Populate the player list with all players if no tournament is selected
    if (!currentSelectedTournament) {
      populatePlayerList(players);
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
    currentSelectedTournament = tournaments.find(tournament => tournament.tournament_id == selectedTournamentId);
    if (currentSelectedTournament) {
      tournamentNameElement.textContent = currentSelectedTournament.name;
      currentTournamentName = currentSelectedTournament.name;

      // Get the list of player IDs for the selected tournament
      const playerIds = currentSelectedTournament.players;

      // Filter the players who are in the selected tournament
      const tournamentPlayers = players.filter(player => playerIds.includes(player.player_id));

      // Populate the player list
      populatePlayerList(tournamentPlayers);
    } else {
      tournamentNameElement.textContent = "Select a Tournament";
      currentSelectedTournament = null;
      // Populate the player list with all players
      populatePlayerList(players);
    }
  }

  // Function to populate the player list
  function populatePlayerList(tournamentPlayers) {
    // Clear the existing player list
    playerListElement.innerHTML = '';

    if (tournamentPlayers.length === 0) {
      // If no players, display a message
      const listItem = document.createElement('md-list-item');
      listItem.textContent = 'No players registered.';
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
