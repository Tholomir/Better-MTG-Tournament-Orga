// /js/main.js

import PlayerManager from './PlayerManager.js';
import TournamentManager from './TournamentManager.js';
import UIManager from './UIManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const playerManager = new PlayerManager();
  const tournamentManager = new TournamentManager();
  const uiManager = new UIManager(playerManager, tournamentManager);

  uiManager.initialize();
});
