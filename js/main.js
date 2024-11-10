// /js/main.js

import PlayerManager from './PlayerManager.js';
import TournamentManager from './TournamentManager.js';
import UIManager from './UIManager.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded.');
  const playerManager = new PlayerManager();
  const tournamentManager = new TournamentManager();
  const uiManager = new UIManager(playerManager, tournamentManager);

  uiManager.initialize()
    .then(() => {
      console.log('Application initialized successfully.');
    })
    .catch((error) => {
      console.error('Application initialization failed:', error);
    });
});
