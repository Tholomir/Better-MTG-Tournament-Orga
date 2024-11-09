// /js/MatchManager.js

export default class MatchManager {
    constructor() {
      this.matches = [];
    }
  
    // Load matches from the backend
    async loadMatches() {
      try {
        const response = await fetch('http://localhost:3000/api/matches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const matchesData = await response.json();
        this.matches = matchesData.matches.map(match => ({
          ...match,
          match_id: Number(match.match_id),
        }));
        return this.matches;
      } catch (error) {
        console.error('Failed to load matches:', error);
        return [];
      }
    }
  
    // Add a new match
    async addMatch(newMatch) {
      try {
        const response = await fetch('http://localhost:3000/api/matches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMatch),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add match');
        }
        const responseData = await response.json();
        this.matches.push({
          ...responseData.match,
          match_id: Number(responseData.match.match_id),
        });
        return responseData.match;
      } catch (error) {
        console.error('Error adding match:', error);
        throw error;
      }
    }
  
    // Get matches by tournament ID
    getMatchesByTournament(tournamentId) {
      return this.matches.filter(match => match.tournament_id === Number(tournamentId));
    }
  
    // Additional match-related methods can be added here
  }
  