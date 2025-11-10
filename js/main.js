import { Game } from './Game.js';
import { initSkinMenuToggle } from './utils/skinMenuToggle.js';

/**
 * Main entry point for the game
 */

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game('gameCanvas');
    initSkinMenuToggle();
    console.log('Doodle Jump Game initialized!');
});
