// /js/TournamentManager.js

export default class TournamentManager {
  constructor() {
    this.tournaments = [];
    this.currentSelectedTournament = null;
    this.apiBaseUrl = 'http://localhost:3000/api/tournaments';

    console.log('TournamentManager initialized.');
  }

  /**
   * Load tournaments from the backend.
   * Fetches all tournaments and stores them locally.
   * @returns {Promise<Array>} - Array of tournament objects.
   */
  async loadTournaments() {
    console.log('Loading tournaments from backend.');
    try {
      const response = await fetch(this.apiBaseUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const tournamentsData = await response.json();
      this.tournaments = tournamentsData.tournaments.map(tournament => ({
        ...tournament,
        tournament_id: Number(tournament.tournament_id),
        players: tournament.players.map(id => Number(id)),
        rounds: Number(tournament.rounds),
        current_round: Number(tournament.current_round),
      }));
      console.log('Tournaments loaded:', this.tournaments);
      return this.tournaments;
    } catch (error) {
      console.error('Failed to load tournaments:', error);
      return [];
    }
  }

  /**
   * Get all loaded tournaments.
   * @returns {Array} - Array of tournament objects.
   */
  getTournaments() {
    return this.tournaments;
  }

  /**
   * Select a tournament by its ID.
   * Sets the currentSelectedTournament property.
   * @param {number|string} tournamentId - The ID of the tournament to select.
   * @returns {Object|null} - The selected tournament object or null if not found.
   */
  selectTournament(tournamentId) {
    const id = Number(tournamentId);
    console.log(`Selecting tournament with ID: ${id}`);
    this.currentSelectedTournament = this.tournaments.find(
      t => t.tournament_id === id
    ) || null;
    console.log('Current selected tournament:', this.currentSelectedTournament);
    return this.currentSelectedTournament;
  }

  /**
   * Get the currently selected tournament.
   * @returns {Object|null} - The currently selected tournament object or null.
   */
  getCurrentTournament() {
    return this.currentSelectedTournament;
  }

  /**
   * Create a new tournament.
   * Sends a POST request to the backend to create a tournament.
   * @param {string} name - The name of the tournament.
   * @returns {Promise<Object>} - The newly created tournament object.
   */
  async createTournament(name) {
    console.log(`Creating tournament with name: ${name}`);
    // Basic validation
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid tournament name.');
    }

    // Prepare the tournament data
    const newTournament = {
      name: name.trim(),
      // Other fields will be set by the backend
    };

    try {
      const response = await fetch(this.apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTournament),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create tournament');
      }

      const createdTournament = await response.json();
      // Assuming the backend returns the created tournament object
      this.tournaments.push({
        ...createdTournament,
        tournament_id: Number(createdTournament.tournament_id),
        players: [],
        rounds: 0,
        current_round: 0,
      });

      console.log('Tournament created:', createdTournament);
      return createdTournament;
    } catch (error) {
      console.error('Error creating tournament:', error);
      throw error;
    }
  }

  /**
   * Delete a tournament by its ID.
   * Sends a DELETE request to the backend to remove the tournament.
   * @param {number|string} tournamentId - The ID of the tournament to delete.
   * @returns {Promise<void>}
   */
  async deleteTournament(tournamentId) {
    const id = Number(tournamentId);
    console.log(`Deleting tournament with ID: ${id}`);
    if (isNaN(id)) {
      throw new Error('Invalid tournament ID.');
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete tournament');
      }

      // Remove the tournament from the local array
      this.tournaments = this.tournaments.filter(
        tournament => tournament.tournament_id !== id
      );

      // If the deleted tournament was selected, reset the selection
      if (
        this.currentSelectedTournament &&
        this.currentSelectedTournament.tournament_id === id
      ) {
        this.currentSelectedTournament = null;
      }

      console.log(`Tournament with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting tournament:', error);
      throw error;
    }
  }

  /**
   * Update the players of a tournament.
   * Sends a PUT request to the backend to update the tournament's player list.
   * @param {number|string} tournamentId - The ID of the tournament.
   * @param {Array<number|string>} playerIds - Array of player IDs to set.
   * @returns {Promise<Object>} - The updated tournament object.
   */
  async updateTournamentPlayers(tournamentId, playerIds) {
    const id = Number(tournamentId);
    console.log(`Updating players for tournament ID: ${id}`);
    if (isNaN(id)) {
      throw new Error('Invalid tournament ID.');
    }

    if (!Array.isArray(playerIds)) {
      throw new Error('Player IDs must be an array.');
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/${id}/players`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ players: playerIds.map(id => Number(id)) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update tournament players');
      }

      const updatedTournament = await response.json();

      // Update the local tournament data
      const index = this.tournaments.findIndex(t => t.tournament_id === id);
      if (index !== -1) {
        this.tournaments[index].players = updatedTournament.players.map(id => Number(id));
      }

      // If the updated tournament is the currently selected one, update the reference
      if (
        this.currentSelectedTournament &&
        this.currentSelectedTournament.tournament_id === id
      ) {
        this.currentSelectedTournament = this.tournaments[index];
      }

      console.log('Tournament players updated:', updatedTournament);
      return updatedTournament;
    } catch (error) {
      console.error('Error updating tournament players:', error);
      throw error;
    }
  }

  /**
   * Add a single player to the currently selected tournament.
   * @param {number} playerId - The ID of the player to add.
   * @returns {Promise<void>}
   */
  async addPlayerToTournament(playerId) {
    console.log(`Adding player ID ${playerId} to current tournament.`);
    if (!this.currentSelectedTournament) {
      throw new Error('No tournament selected.');
    }

    // Avoid adding duplicate players
    if (this.currentSelectedTournament.players.includes(playerId)) {
      throw new Error('Player is already participating in the tournament.');
    }

    const updatedPlayerIds = [...this.currentSelectedTournament.players, playerId];

    await this.updateTournamentPlayers(this.currentSelectedTournament.tournament_id, updatedPlayerIds);
  }

  /**
   * Remove a single player from the currently selected tournament.
   * @param {number} playerId - The ID of the player to remove.
   * @returns {Promise<void>}
   */
  async removePlayerFromTournament(playerId) {
    console.log(`Removing player ID ${playerId} from current tournament.`);
    if (!this.currentSelectedTournament) {
      throw new Error('No tournament selected.');
    }

    if (!this.currentSelectedTournament.players.includes(playerId)) {
      throw new Error('Player is not participating in the tournament.');
    }

    const updatedPlayerIds = this.currentSelectedTournament.players.filter(id => id !== playerId);

    await this.updateTournamentPlayers(this.currentSelectedTournament.tournament_id, updatedPlayerIds);
  }
}
