// uiLogic.js

document.addEventListener('DOMContentLoaded', () => {
  const playerManager = new PlayerManager();
  const tournamentManager = new TournamentManager();
  const uiManager = new UIManager(playerManager, tournamentManager);

  uiManager.initialize();
});

// PlayerManager class handles player-related data and operations
class PlayerManager {
  constructor() {
    this.players = [];
  }

  // Load players from the backend
  async loadPlayers() {
    try {
      const response = await fetch('http://localhost:3000/api/players');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const playersData = await response.json();
      this.players = playersData.players;
      return this.players;
    } catch (error) {
      console.error('Failed to load players:', error);
      return [];
    }
  }

  // Add a new player
  async addPlayer(newPlayer) {
    try {
      const response = await fetch('http://localhost:3000/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add player');
      }
      const responseData = await response.json();
      this.players.push(responseData.player);
      return responseData.player;
    } catch (error) {
      console.error('Error adding player:', error);
      throw error;
    }
  }

  // Delete a player
  async deletePlayer(playerId) {
    try {
      const response = await fetch(`http://localhost:3000/api/players/${playerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete player');
      }
      this.players = this.players.filter(player => player.player_id !== playerId);
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  }

  // Get all players
  getPlayers() {
    return this.players;
  }

  // Get a player by ID
  getPlayerById(playerId) {
    return this.players.find(player => player.player_id === playerId);
  }
}

// TournamentManager class handles tournament-related data and operations
class TournamentManager {
  constructor() {
    this.tournaments = [];
    this.currentSelectedTournament = null;
  }

  // Load tournaments from the backend
  async loadTournaments() {
    try {
      const response = await fetch('http://localhost:3000/api/tournaments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const tournamentsData = await response.json();
      this.tournaments = tournamentsData.tournaments;
      return this.tournaments;
    } catch (error) {
      console.error('Failed to load tournaments:', error);
      return [];
    }
  }

  // Get all tournaments
  getTournaments() {
    return this.tournaments;
  }

  // Select a tournament by ID
  selectTournament(tournamentId) {
    this.currentSelectedTournament = this.tournaments.find(t => t.tournament_id == tournamentId) || null;
    return this.currentSelectedTournament;
  }

  // Get the currently selected tournament
  getCurrentTournament() {
    return this.currentSelectedTournament;
  }
}

// UIManager class handles UI interactions and updates
class UIManager {
  constructor(playerManager, tournamentManager) {
    this.playerManager = playerManager;
    this.tournamentManager = tournamentManager;

    // Initialize UI elements
    this.initUIElements();

    // Bind event listeners
    this.bindEventListeners();
  }

  // Initialize UI elements by selecting DOM elements
  initUIElements() {
    // Tournament name element
    this.tournamentNameElement = document.getElementById('tournamentName');
    this.tournamentSelectField = document.getElementById('tournamentSelectField');
    this.playerListElement = document.getElementById('playerList');

    // Add player dialog elements
    this.addPlayerButton = document.getElementById('addPlayerButton');
    this.addPlayerDialog = document.getElementById('addPlayerDialog');
    this.usernameField = document.getElementById('usernameField');
    this.fullNameField = document.getElementById('fullNameField');
    this.iconSelectField = document.getElementById('iconSelectField');
    this.confirmAddPlayerButton = document.getElementById('confirmAddPlayerButton');
    this.cancelAddPlayerButton = document.getElementById('cancelAddPlayerButton');

    // Remove player dialog elements
    this.removePlayerButton = document.getElementById('removePlayerButton');
    this.removePlayerDialog = document.getElementById('removePlayerDialog');
    this.removePlayerList = document.getElementById('removePlayerList');
    this.cancelRemovePlayerButton = document.getElementById('cancelRemovePlayerButton');
  }

  // Bind event listeners to UI elements
  bindEventListeners() {
    // Add Player Dialog
    this.addPlayerButton.addEventListener('click', () => this.openAddPlayerDialog());
    this.confirmAddPlayerButton.addEventListener('click', () => this.handleAddPlayer());
    this.cancelAddPlayerButton.addEventListener('click', () => this.closeAddPlayerDialog());

    // Remove Player Dialog
    this.removePlayerButton.addEventListener('click', () => this.openRemovePlayerDialog());
    this.cancelRemovePlayerButton.addEventListener('click', () => this.closeRemovePlayerDialog());

    // Tournament Selection
    this.tournamentSelectField.addEventListener('change', (event) => {
      const selectedTournamentId = event.target.value;
      this.handleTournamentSelection(selectedTournamentId);
    });
  }

  // Initialize the UI by loading data and populating elements
  async initialize() {
    // Load data
    await Promise.all([
      this.tournamentManager.loadTournaments(),
      this.playerManager.loadPlayers()
    ]);

    // Initialize UI
    this.populateTournamentSelect();
    this.updatePlayerList();
  }

  // Open the Add Player Dialog
  openAddPlayerDialog() {
    this.addPlayerDialog.show();
  }

  // Close the Add Player Dialog
  closeAddPlayerDialog() {
    this.clearAddPlayerForm();
    this.addPlayerDialog.close();
  }

  // Clear the Add Player form fields
  clearAddPlayerForm() {
    this.usernameField.value = '';
    this.fullNameField.value = '';
    this.iconSelectField.value = '';
  }

  // Handle adding a new player
  async handleAddPlayer() {
    // Validate form inputs
    const username = this.usernameField.value.trim();
    const fullName = this.fullNameField.value.trim();
    const icon = this.iconSelectField.value;

    if (!username || !fullName || !icon) {
      alert('Please fill in all required fields.');
      return;
    }

    const newPlayer = {
      username: username,
      full_name: fullName,
      icon: icon
    };

    try {
      await this.playerManager.addPlayer(newPlayer);
      // Update UI
      this.updatePlayerList();
      this.closeAddPlayerDialog();
    } catch (error) {
      alert(`Error adding player: ${error.message}`);
    }
  }

  // Open the Remove Player Dialog
  openRemovePlayerDialog() {
    this.populateRemovePlayerList();
    this.removePlayerDialog.show();
  }

  // Close the Remove Player Dialog
  closeRemovePlayerDialog() {
    this.removePlayerDialog.close();
  }

  // Populate the Remove Player list with current players
  populateRemovePlayerList() {
    const players = this.playerManager.getPlayers();
    // Clear the existing list
    this.removePlayerList.innerHTML = '';

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
        this.confirmDeletePlayer(player);
      });

      // Append elements to the list item
      listItem.appendChild(headline);
      listItem.appendChild(deleteButton);

      // Append the list item to the remove player list
      this.removePlayerList.appendChild(listItem);
    });
  }

  // Confirm player deletion
  confirmDeletePlayer(player) {
    const confirmation = confirm(`Are you sure you want to delete ${player.username}? This action cannot be undone.`);
    if (confirmation) {
      this.deletePlayer(player.player_id);
    }
  }

  // Delete a player and update the UI
  async deletePlayer(playerId) {
    try {
      await this.playerManager.deletePlayer(playerId);
      // Update UI
      this.updatePlayerList();
      this.populateRemovePlayerList();
      alert('Player deleted successfully.');
    } catch (error) {
      alert(`Error deleting player: ${error.message}`);
    }
  }

  // Populate the tournament select field
  populateTournamentSelect() {
    const tournaments = this.tournamentManager.getTournaments();
    // Clear any existing options
    this.tournamentSelectField.innerHTML = '';

    // Add a default "Select" option
    const defaultOption = document.createElement('md-select-option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a Tournament --';
    this.tournamentSelectField.appendChild(defaultOption);

    tournaments.forEach(tournament => {
      const option = document.createElement('md-select-option');
      option.value = tournament.tournament_id;
      option.textContent = tournament.name;
      this.tournamentSelectField.appendChild(option);
    });
  }

  // Handle tournament selection change
  handleTournamentSelection(selectedTournamentId) {
    const selectedTournament = this.tournamentManager.selectTournament(selectedTournamentId);
    if (selectedTournament) {
      this.tournamentNameElement.textContent = selectedTournament.name;
    } else {
      this.tournamentNameElement.textContent = "Select a Tournament";
    }
    this.updatePlayerList();
  }

  // Update the player list based on the selected tournament
  updatePlayerList() {
    const currentTournament = this.tournamentManager.getCurrentTournament();
    const allPlayers = this.playerManager.getPlayers();
    let playersToDisplay;

    if (currentTournament) {
      const playerIds = currentTournament.players;
      playersToDisplay = allPlayers.filter(player => playerIds.includes(player.player_id));
    } else {
      playersToDisplay = allPlayers;
    }

    this.populatePlayerList(playersToDisplay);
  }

  // Populate the player list in the UI
  populatePlayerList(players) {
    // Clear the existing player list
    this.playerListElement.innerHTML = '';

    if (players.length === 0) {
      // If no players, display a message
      const listItem = document.createElement('md-list-item');
      listItem.textContent = 'No players registered.';
      this.playerListElement.appendChild(listItem);
      return;
    }

    // Loop through the players and create list items
    players.forEach(player => {
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
      const stats = player.statistics || { wins: 0, losses: 0, draws: 0 };
      supportingText.textContent = `Wins: ${stats.wins}, Losses: ${stats.losses}, Draws: ${stats.draws}`;

      // Append elements to the list item
      listItem.appendChild(icon);
      listItem.appendChild(headline);
      listItem.appendChild(supportingText);

      // Append the list item to the player list
      this.playerListElement.appendChild(listItem);
    });
  }
}
