import { Game } from './Game.js';

/**
 * Main entry point for the game
 */

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game('gameCanvas');
    console.log('Doodle Jump Game initialized!');
});
