// /js/TournamentManager.js

export default class TournamentManager {
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
        this.tournaments = tournamentsData.tournaments.map(tournament => ({
          ...tournament,
          tournament_id: Number(tournament.tournament_id),
          players: tournament.players.map(id => Number(id)),
        }));
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
      this.currentSelectedTournament = this.tournaments.find(
        t => t.tournament_id === Number(tournamentId)
      ) || null;
      return this.currentSelectedTournament;
    }
  
    // Get the currently selected tournament
    getCurrentTournament() {
      return this.currentSelectedTournament;
    }
  
    // Update the players of a tournament
    async updateTournamentPlayers(tournamentId, playerIds) {
      try {
        const response = await fetch(`http://localhost:3000/api/tournaments/${tournamentId}/players`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ players: playerIds }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update tournament players');
        }
        // Update the local tournament data
        const tournament = this.tournaments.find(t => t.tournament_id === Number(tournamentId));
        if (tournament) {
          tournament.players = playerIds.map(id => Number(id));
        }
      } catch (error) {
        console.error('Error updating tournament players:', error);
        throw error;
      }
    }
  }
  