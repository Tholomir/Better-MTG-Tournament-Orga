// /js/PlayerManager.js

export default class PlayerManager {
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
        this.players = playersData.players.map(player => ({
          ...player,
          player_id: Number(player.player_id),
        }));
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
      return this.players.find(player => player.player_id === playerId) || null;
    }
  }
  