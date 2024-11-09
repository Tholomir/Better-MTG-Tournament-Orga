// /js/UIManager.js

export default class UIManager {
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
  
      // Tournament Players Dialog elements
      this.tournamentPlayersButton = document.getElementById('tournamentPlayersButton');
      this.tournamentPlayersDialog = document.getElementById('tournamentPlayersDialog');
      this.tournamentPlayersList = document.getElementById('tournamentPlayersList');
      this.cancelTournamentPlayersButton = document.getElementById('cancelTournamentPlayersButton');
      this.saveTournamentPlayersButton = document.getElementById('saveTournamentPlayersButton');
  
      // Disable the tournamentPlayersButton if no tournament is selected
      this.tournamentPlayersButton.disabled = true;
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
  
      // Tournament Players Dialog
      this.tournamentPlayersButton.addEventListener('click', () => this.openTournamentPlayersDialog());
      this.cancelTournamentPlayersButton.addEventListener('click', () => this.closeTournamentPlayersDialog());
      this.saveTournamentPlayersButton.addEventListener('click', () => this.saveTournamentPlayers());
    }
  
    // Initialize the UI by loading data and populating elements
    async initialize() {
      // Load data
      await Promise.all([
        this.tournamentManager.loadTournaments(),
        this.playerManager.loadPlayers(),
        // If you plan to use MatchManager, you can initialize it here
        // this.matchManager.loadMatches(),
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
        icon: icon,
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
        // Enable the tournamentPlayersButton when a tournament is selected
        this.tournamentPlayersButton.disabled = false;
      } else {
        this.tournamentNameElement.textContent = 'Select a Tournament';
        // Disable the tournamentPlayersButton when no tournament is selected
        this.tournamentPlayersButton.disabled = true;
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
  
    // Open the Tournament Players Dialog
    openTournamentPlayersDialog() {
      if (!this.tournamentManager.getCurrentTournament()) {
        alert('Please select a tournament first.');
        return;
      }
      this.populateTournamentPlayersList();
      this.tournamentPlayersDialog.show();
    }
  
    // Close the Tournament Players Dialog
    closeTournamentPlayersDialog() {
      this.tournamentPlayersDialog.close();
    }
  
    // Populate the tournament players list
    populateTournamentPlayersList() {
      const allPlayers = this.playerManager.getPlayers();
      const currentTournament = this.tournamentManager.getCurrentTournament();
      const tournamentPlayerIds = currentTournament.players || [];
  
      // Clear existing list
      this.tournamentPlayersList.innerHTML = '';
  
      allPlayers.forEach(player => {
        const listItem = document.createElement('md-list-item');
  
        // Player Name
        const headline = document.createElement('div');
        headline.setAttribute('slot', 'headline');
        headline.textContent = player.username;
  
        // Participation Switch
        const participationSwitch = document.createElement('md-switch');
        participationSwitch.setAttribute('slot', 'end');
  
        // Ensure both IDs are numbers
        const playerId = Number(player.player_id);
        const tournamentPlayerIdsNumeric = tournamentPlayerIds.map(id => Number(id));
  
        // Set the switch state
        participationSwitch.selected = tournamentPlayerIdsNumeric.includes(playerId);
  
        // Append elements to list item
        listItem.appendChild(headline);
        listItem.appendChild(participationSwitch);
  
        // Append list item to the list
        this.tournamentPlayersList.appendChild(listItem);
      });
    }
  
    // Save the selected tournament players
    async saveTournamentPlayers() {
      const currentTournament = this.tournamentManager.getCurrentTournament();
      if (!currentTournament) {
        alert('No tournament selected.');
        return;
      }
  
      // Get the updated list of player IDs from the switches
      const switches = this.tournamentPlayersList.querySelectorAll('md-switch');
      const updatedPlayerIds = [];
  
      switches.forEach((switchElement, index) => {
        const player = this.playerManager.getPlayers()[index];
        if (switchElement.selected) {
          updatedPlayerIds.push(Number(player.player_id));
        }
      });
  
      try {
        // Update tournament players in the backend
        await this.tournamentManager.updateTournamentPlayers(currentTournament.tournament_id, updatedPlayerIds);
  
        // Optionally reload tournaments to ensure data consistency
        await this.tournamentManager.loadTournaments();
  
        // Re-select the current tournament to update its data
        this.tournamentManager.selectTournament(currentTournament.tournament_id);
  
        // Update UI
        this.updatePlayerList();
        this.closeTournamentPlayersDialog();
        alert('Tournament players updated successfully.');
      } catch (error) {
        console.error('Error updating tournament players:', error);
        alert(`Error updating tournament players: ${error.message}`);
      }
    }
  }
  