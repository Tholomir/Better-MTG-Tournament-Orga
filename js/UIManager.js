// /js/UIManager.js

export default class UIManager {
  constructor(playerManager, tournamentManager) {
    this.playerManager = playerManager;
    this.tournamentManager = tournamentManager;

    // Initialize UI elements
    this.initUIElements();

    // Bind event listeners
    this.bindEventListeners();

    console.log('UIManager initialized.');
  }

  // Initialize UI elements by selecting DOM elements
  initUIElements() {
    // Tournament elements
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
    this.closeTournamentPlayersButton = document.getElementById('closeTournamentPlayersButton');

    // Create Tournament Dialog elements
    this.createNewTournamentButton = document.getElementById('createNewTournamentButton');
    this.createTournamentDialog = document.getElementById('createTournamentDialog');
    this.tournamentNameField = document.getElementById('tournamentNameField');
    this.confirmCreateTournamentButton = document.getElementById('confirmCreateTournamentButton');
    this.cancelCreateTournamentButton = document.getElementById('cancelCreateTournamentButton');

    // Delete Tournament Button
    this.deleteTournamentButton = document.getElementById('deleteTournamentButton');

    console.log('UI elements initialized.');
  }

  // Bind event listeners to UI elements
  bindEventListeners() {
    console.log('Binding event listeners.');

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
    this.closeTournamentPlayersButton.addEventListener('click', () => this.closeTournamentPlayersDialog());

    // Create Tournament Dialog
    this.createNewTournamentButton.addEventListener('click', () => this.openCreateTournamentDialog());
    this.confirmCreateTournamentButton.addEventListener('click', () => this.handleCreateTournament());
    this.cancelCreateTournamentButton.addEventListener('click', () => this.closeCreateTournamentDialog());

    // Delete Tournament Button
    this.deleteTournamentButton.addEventListener('click', () => this.handleDeleteTournament());

    console.log('Event listeners bound.');
  }

  // Initialize the UI by loading data and populating elements
  async initialize() {
    console.log('Initializing UI...');
    try {
      // Load data
      await Promise.all([
        this.tournamentManager.loadTournaments(),
        this.playerManager.loadPlayers(),
      ]);

      // Initialize UI
      this.populateTournamentSelect();
      this.updatePlayerList();

      console.log('UI initialized.');
    } catch (error) {
      console.error('Error during UI initialization:', error);
      alert('Failed to initialize the application. Please try again later.');
    }
  }

  // Open the Add Player Dialog
  openAddPlayerDialog() {
    console.log('Opening Add Player Dialog.');
    this.addPlayerDialog.show();
    this.usernameField.focus();
  }

  // Close the Add Player Dialog
  closeAddPlayerDialog() {
    console.log('Closing Add Player Dialog.');
    this.clearAddPlayerForm();
    this.addPlayerDialog.close();
    this.addPlayerButton.focus();
  }

  // Clear the Add Player form fields
  clearAddPlayerForm() {
    console.log('Clearing Add Player form.');
    this.usernameField.value = '';
    this.fullNameField.value = '';
    this.iconSelectField.value = '';
  }

  // Handle adding a new player
  async handleAddPlayer() {
    console.log('Handling Add Player.');
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
      console.log('Player added successfully.');
    } catch (error) {
      alert(`Error adding player: ${error.message}`);
      console.error('Error adding player:', error);
    }
  }

  // Open the Remove Player Dialog
  openRemovePlayerDialog() {
    console.log('Opening Remove Player Dialog.');
    this.populateRemovePlayerList();
    this.removePlayerDialog.show();
  }

  // Close the Remove Player Dialog
  closeRemovePlayerDialog() {
    console.log('Closing Remove Player Dialog.');
    this.removePlayerDialog.close();
    this.removePlayerButton.focus();
  }

  // Populate the Remove Player list with current players
  populateRemovePlayerList() {
    console.log('Populating Remove Player List.');
    const players = this.playerManager.getPlayers();
    // Clear the existing list
    this.removePlayerList.innerHTML = '';

    // Loop through the players and create list items
    players.forEach((player) => {
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
    console.log(`Confirming deletion of player: ${player.username}`);
    const confirmation = confirm(
      `Are you sure you want to delete ${player.username}? This action cannot be undone.`
    );
    if (confirmation) {
      this.deletePlayer(player.player_id);
    }
  }

  // Delete a player and update the UI
  async deletePlayer(playerId) {
    console.log(`Deleting player with ID: ${playerId}`);
    try {
      await this.playerManager.deletePlayer(playerId);
      // Update UI
      this.updatePlayerList();
      this.populateRemovePlayerList();
      alert('Player deleted successfully.');
      console.log('Player deleted successfully.');
    } catch (error) {
      alert(`Error deleting player: ${error.message}`);
      console.error('Error deleting player:', error);
    }
  }

  // Populate the tournament select field
  populateTournamentSelect() {
    console.log('Populating tournament select field.');
    const tournaments = this.tournamentManager.getTournaments();

    // Store the current value to preserve selection
    const currentValue = this.tournamentSelectField.value;

    // Check if the options have changed
    let optionsChanged = false;
    const existingOptions = Array.from(this.tournamentSelectField.querySelectorAll('md-select-option')).map(opt => opt.value);
    const newOptions = tournaments.map(t => t.tournament_id.toString());

    // Compare existing options with new options
    if (existingOptions.length !== newOptions.length + 1) { // +1 for the default option
      optionsChanged = true;
    } else {
      for (let i = 1; i < existingOptions.length; i++) { // Skip the default option
        if (existingOptions[i] !== newOptions[i - 1]) {
          optionsChanged = true;
          break;
        }
      }
    }

    if (optionsChanged) {
      // Clear any existing options
      this.tournamentSelectField.innerHTML = '';

      // Add a default "Select" option
      const defaultOption = document.createElement('md-select-option');
      defaultOption.value = '';
      defaultOption.textContent = '-- Select a Tournament --';
      this.tournamentSelectField.appendChild(defaultOption);

      tournaments.forEach((tournament) => {
        const option = document.createElement('md-select-option');
        option.value = tournament.tournament_id;
        option.textContent = tournament.name;
        this.tournamentSelectField.appendChild(option);
      });

      console.log('Tournament select field options updated.');
    } else {
      console.log('Tournament select field options unchanged.');
    }

    // Restore the selected value
    this.tournamentSelectField.value = currentValue;
  }

  // Handle tournament selection change
  handleTournamentSelection(selectedTournamentId) {
    console.log(`Tournament selected with ID: ${selectedTournamentId}`);

    // Preserve focus
    const isSelectFocused = (document.activeElement === this.tournamentSelectField);

    const selectedTournament = this.tournamentManager.selectTournament(selectedTournamentId);
    if (selectedTournament) {
      this.tournamentNameElement.textContent = selectedTournament.name;
      // Enable the tournamentPlayersButton and deleteTournamentButton when a tournament is selected
      this.tournamentPlayersButton.disabled = false;
      this.deleteTournamentButton.disabled = false;
      console.log(`Selected tournament: ${selectedTournament.name}`);
    } else {
      this.tournamentNameElement.textContent = 'Select a Tournament';
      // Disable the tournamentPlayersButton and deleteTournamentButton when no tournament is selected
      this.tournamentPlayersButton.disabled = true;
      this.deleteTournamentButton.disabled = true;
      console.log('No tournament selected.');
    }
    this.updatePlayerList();

    // Restore focus if it was previously on the select field
    if (isSelectFocused) {
      this.tournamentSelectField.focus();
      console.log('Focus restored to tournamentSelectField.');
    }
  }

  // Update the player list based on the selected tournament
  updatePlayerList() {
    console.log('Updating player list.');
    const currentTournament = this.tournamentManager.getCurrentTournament();
    const allPlayers = this.playerManager.getPlayers();
    let playersToDisplay;

    if (currentTournament) {
      const playerIds = currentTournament.players;
      playersToDisplay = allPlayers.filter((player) =>
        playerIds.includes(player.player_id)
      );
    } else {
      playersToDisplay = allPlayers;
    }

    this.populatePlayerList(playersToDisplay);
  }

  // Populate the player list in the UI
  populatePlayerList(players) {
    console.log('Populating player list.');
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
    players.forEach((player) => {
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
      const stats = player.statistics || {
        wins: 0,
        losses: 0,
        draws: 0,
      };
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
    console.log('Opening Tournament Players Dialog.');
    if (!this.tournamentManager.getCurrentTournament()) {
      alert('Please select a tournament first.');
      console.log('No tournament selected. Cannot open dialog.');
      return;
    }
    this.populateTournamentPlayersList();
    this.tournamentPlayersDialog.show();
  }

  // Close the Tournament Players Dialog
  closeTournamentPlayersDialog() {
    console.log('Closing Tournament Players Dialog.');
    this.tournamentPlayersDialog.close();
    this.tournamentPlayersButton.focus();
  }

  // Populate the tournament players list
  populateTournamentPlayersList() {
    console.log('Populating Tournament Players List.');
    const allPlayers = this.playerManager.getPlayers();
    const currentTournament = this.tournamentManager.getCurrentTournament();
    const tournamentPlayerIds = currentTournament.players || [];

    // Clear existing list
    this.tournamentPlayersList.innerHTML = '';

    allPlayers.forEach((player) => {
      const listItem = document.createElement('md-list-item');

      // Player Name
      const headline = document.createElement('div');
      headline.setAttribute('slot', 'headline');
      headline.textContent = player.username;

      // Participation Switch
      const participationSwitch = document.createElement('md-switch');
      participationSwitch.setAttribute('slot', 'end');
      participationSwitch.id = `player-switch-${player.player_id}`;
      participationSwitch.setAttribute('aria-label', `Toggle participation for ${player.username}`);

      // Set the switch state
      const isPlayerInTournament = tournamentPlayerIds.includes(player.player_id);
      participationSwitch.selected = isPlayerInTournament;

      // For debugging
      console.log(`Player ID: ${player.player_id}, isPlayerInTournament: ${isPlayerInTournament}, participationSwitch.selected: ${participationSwitch.selected}`);

      // Add event listener to handle switch toggle
      participationSwitch.addEventListener('change', async (event) => {
        console.log(`Switch toggled for Player ID: ${player.player_id}`);
        const isSelected = event.target.selected;
        console.log(`isSelected: ${isSelected}`);

        participationSwitch.disabled = true; // Prevent multiple rapid toggles

        if (isSelected) {
          try {
            await this.tournamentManager.addPlayerToTournament(player.player_id);
            this.updatePlayerList();
            console.log(`Player ID ${player.player_id} added to tournament.`);
          } catch (error) {
            alert(`Error adding player: ${error.message}`);
            event.target.selected = false;
            console.error('Error adding player to tournament:', error);
          }
        } else {
          try {
            await this.tournamentManager.removePlayerFromTournament(player.player_id);
            this.updatePlayerList();
            console.log(`Player ID ${player.player_id} removed from tournament.`);
          } catch (error) {
            alert(`Error removing player: ${error.message}`);
            event.target.selected = true;
            console.error('Error removing player from tournament:', error);
          }
        }

        participationSwitch.disabled = false;
      });

      // Append elements to list item
      listItem.appendChild(headline);
      listItem.appendChild(participationSwitch);

      // Append list item to the list
      this.tournamentPlayersList.appendChild(listItem);
    });
  }

  // Open the Create Tournament Dialog
  openCreateTournamentDialog() {
    console.log('Opening Create Tournament Dialog.');
    this.createTournamentDialog.show();
    this.tournamentNameField.focus();
  }

  // Close the Create Tournament Dialog
  closeCreateTournamentDialog() {
    console.log('Closing Create Tournament Dialog.');
    this.clearCreateTournamentForm();
    this.createTournamentDialog.close();
    this.createNewTournamentButton.focus();
  }

  // Clear the Create Tournament form fields
  clearCreateTournamentForm() {
    console.log('Clearing Create Tournament form.');
    this.tournamentNameField.value = '';
  }

  // Handle creating a new tournament
  async handleCreateTournament() {
    console.log('Handling Create Tournament.');
    const tournamentName = this.tournamentNameField.value.trim();

    if (!tournamentName) {
      alert('Please enter a tournament name.');
      return;
    }

    try {
      await this.tournamentManager.createTournament(tournamentName);
      // Update UI
      await this.tournamentManager.loadTournaments();
      this.populateTournamentSelect();
      this.closeCreateTournamentDialog();
      alert('Tournament created successfully.');
      console.log('Tournament created successfully.');
    } catch (error) {
      alert(`Error creating tournament: ${error.message}`);
      console.error('Error creating tournament:', error);
    }
  }

  // Handle the deletion of the currently selected tournament.
  async handleDeleteTournament() {
    console.log('Handling Delete Tournament.');
    const currentTournament = this.tournamentManager.getCurrentTournament();

    if (!currentTournament) {
      alert('No tournament is currently selected.');
      console.log('No tournament selected. Cannot delete.');
      return;
    }

    const confirmation = confirm(`Are you sure you want to delete the tournament "${currentTournament.name}"? This action cannot be undone.`);

    if (!confirmation) {
      console.log('Tournament deletion canceled by user.');
      return; // User canceled the deletion
    }

    try {
      await this.tournamentManager.deleteTournament(currentTournament.tournament_id);
      alert(`Tournament "${currentTournament.name}" has been deleted successfully.`);
      console.log(`Tournament "${currentTournament.name}" deleted successfully.`);

      // Refresh the tournaments list in the UI
      await this.tournamentManager.loadTournaments();
      this.populateTournamentSelect();

      // Reset the UI to default state
      this.tournamentNameElement.textContent = 'Select a Tournament';
      this.tournamentSelectField.value = '';
      this.tournamentPlayersButton.disabled = true;
      this.deleteTournamentButton.disabled = true;
      this.updatePlayerList();
    } catch (error) {
      console.error('Error deleting tournament:', error);
      alert(`Failed to delete tournament: ${error.message}`);
    }
  }
}
