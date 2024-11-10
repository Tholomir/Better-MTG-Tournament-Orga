// /js/PlayerManager.js

export default class PlayerManager {
  constructor() {
    this.players = [];
    this.apiBaseUrl = 'http://localhost:3000/api/players';

    console.log('PlayerManager initialized.');
  }

  // Load players from the backend
  async loadPlayers() {
    console.log('Loading players from backend.');
    try {
      const response = await fetch(this.apiBaseUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const playersData = await response.json();
      this.players = playersData.players.map(player => ({
        ...player,
        player_id: Number(player.player_id),
      }));
      console.log('Players loaded:', this.players);
      return this.players;
    } catch (error) {
      console.error('Failed to load players:', error);
      return [];
    }
  }

  // Add a new player
  async addPlayer(newPlayer) {
    console.log('Adding new player:', newPlayer);
    try {
      const response = await fetch(this.apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add player');
      }
      const responseData = await response.json();
      this.players.push({
        ...responseData.player,
        player_id: Number(responseData.player.player_id),
      });
      console.log('Player added:', responseData.player);
      return responseData.player;
    } catch (error) {
      console.error('Error adding player:', error);
      throw error;
    }
  }

  // Delete a player
  async deletePlayer(playerId) {
    console.log(`Deleting player with ID: ${playerId}`);
    try {
      const response = await fetch(`${this.apiBaseUrl}/${playerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete player');
      }
      this.players = this.players.filter(player => player.player_id !== playerId);
      console.log(`Player with ID ${playerId} deleted.`);
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
    const player = this.players.find(player => player.player_id === Number(playerId)) || null;
    console.log(`Get player by ID ${playerId}:`, player);
    return player;
  }
}
