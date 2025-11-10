import { CONFIG } from './config.js';
import { Player } from './classes/Player.js';
import { Platform } from './classes/Platform.js';
import { Collectible } from './classes/Collectible.js';
import { InputManager } from './utils/input.js';
import { DEFAULT_SKIN } from './skins.js';

/**
 * Main Game class - Handles game logic, state, and rendering
 */
export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Set canvas dimensions
        this.canvas.width = CONFIG.CANVAS_WIDTH;
        this.canvas.height = CONFIG.CANVAS_HEIGHT;

        // DOM elements
        this.scoreDisplay = document.getElementById('score');
        this.gameOverScreen = document.getElementById('gameOver');
        this.finalScoreDisplay = document.getElementById('finalScore');
        this.restartBtn = document.getElementById('restartBtn');

        // Game state
        this.player = null;
        this.platforms = [];
        this.collectibles = [];
        this.score = 0;
        this.highScore = 0;
        this.isRunning = false;
        this.currentSkin = DEFAULT_SKIN;

        // Input manager (pass canvas for touch events)
        this.inputManager = new InputManager(this.canvas);

        // Setup event listeners
        this.setupEventListeners();
        this.setupSkinSelector();

        // Show start message
        this.showStartMessage();
    }

    /**
     * Setup game event listeners
     */
    setupEventListeners() {
        // Space key to start
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && !this.isRunning) {
                e.preventDefault();
                this.start();
            }
        });

        // Touch/Click on canvas to start game
        this.canvas.addEventListener('click', () => {
            if (!this.isRunning) {
                this.start();
            }
        });

        // Touch start on canvas to start game (mobile)
        this.canvas.addEventListener('touchstart', (e) => {
            if (!this.isRunning) {
                e.preventDefault();
                this.start();
            }
        }, { passive: false });

        // Restart button
        this.restartBtn.addEventListener('click', () => {
            this.start();
        });
    }

    /**
     * Setup skin selector event listeners
     */
    setupSkinSelector() {
        const skinOptions = document.querySelectorAll('.skin-option');

        // Set default active skin
        skinOptions.forEach(option => {
            if (option.dataset.skin === this.currentSkin) {
                option.classList.add('active');
            }

            // Add click event listener
            option.addEventListener('click', () => {
                // Remove active class from all options
                skinOptions.forEach(opt => opt.classList.remove('active'));

                // Add active class to clicked option
                option.classList.add('active');

                // Update current skin
                this.currentSkin = option.dataset.skin;

                // Update player skin if game is running
                if (this.player && this.isRunning) {
                    this.player.setSkin(this.currentSkin);
                }
            });
        });
    }

    /**
     * Initialize/Reset game
     */
    init() {
        this.player = new Player(this.canvas, this.currentSkin);
        this.platforms = [];
        this.collectibles = [];
        this.score = 0;
        this.isRunning = true;
        this.gameOverScreen.style.display = 'none';
        this.updateScore();

        // Create initial platforms
        this.platforms.push(new Platform(
            this.canvas.width / 2 - CONFIG.PLATFORM.WIDTH / 2,
            this.canvas.height - 50
        ));

        for (let i = 0; i < CONFIG.PLATFORM.INITIAL_COUNT; i++) {
            this.createPlatform();
        }
    }

    /**
     * Start the game
     */
    start() {
        this.init();
        this.gameLoop();
    }

    /**
     * Create a new platform
     */
    createPlatform() {
        const x = Math.random() * (this.canvas.width - CONFIG.PLATFORM.WIDTH);
        const lastPlatform = this.platforms[this.platforms.length - 1];
        const y = lastPlatform
            ? lastPlatform.y - CONFIG.PLATFORM.SPACING_MIN - Math.random() * CONFIG.PLATFORM.SPACING_VARIANCE
            : this.canvas.height - 100;

        this.platforms.push(new Platform(x, y));

        // Randomly spawn a collectible on the platform
        if (Math.random() < CONFIG.COLLECTIBLE.SPAWN_CHANCE) {
            const collectibleX = x + CONFIG.PLATFORM.WIDTH / 2 - 10; // Center on platform
            const collectibleY = y - 25; // Slightly above platform
            this.collectibles.push(new Collectible(collectibleX, collectibleY, 'boost'));
        }
    }

    /**
     * Update game state
     */
    update() {
        // Update player with input manager for touch support
        const keys = this.inputManager.getKeys();
        this.player.update(keys, this.platforms, this.inputManager);

        // Check if player is still alive
        if (!this.player.isAlive()) {
            this.endGame();
            return;
        }

        // Update and check collectibles
        this.collectibles.forEach((collectible, index) => {
            collectible.update(this.player, this.canvas);

            // Check collision with player
            if (collectible.checkCollision(this.player)) {
                collectible.collect();
                // Apply boost to player
                this.player.velocityY = collectible.getBoostPower();
                // Remove collectible
                this.collectibles.splice(index, 1);
            }

            // Remove collectibles that are off screen
            if (collectible.isOffScreen(this.canvas)) {
                this.collectibles.splice(index, 1);
            }
        });

        // Update platforms
        this.platforms.forEach((platform, index) => {
            platform.update(this.player, this.canvas);

            // Remove platforms that are off screen and create new ones
            if (platform.isOffScreen(this.canvas)) {
                this.platforms.splice(index, 1);
                this.score += CONFIG.SCORE.POINTS_PER_PLATFORM;
                this.updateScore();
                this.createPlatform();
            }
        });
    }

    /**
     * Render game
     */
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw touch control indicators
        this.drawTouchIndicators();

        // Draw platforms
        this.platforms.forEach(platform => {
            platform.draw(this.ctx);
        });

        // Draw collectibles
        this.collectibles.forEach(collectible => {
            collectible.draw(this.ctx);
        });

        // Draw player
        this.player.draw(this.ctx);
    }

    /**
     * Draw touch control visual indicators
     */
    drawTouchIndicators() {
        const touchState = this.inputManager.getTouchState();

        if (touchState.active) {
            this.ctx.save();

            // Semi-transparent overlay to show touch areas
            const centerX = this.canvas.width / 2;

            // Left side highlight
            if (touchState.direction === 'left') {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                this.ctx.fillRect(0, 0, centerX, this.canvas.height);
            }

            // Right side highlight
            if (touchState.direction === 'right') {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                this.ctx.fillRect(centerX, 0, centerX, this.canvas.height);
            }

            this.ctx.restore();
        }

        // Draw center divider line
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.stroke();
        this.ctx.restore();
    }

    /**
     * Main game loop
     */
    gameLoop() {
        if (!this.isRunning) return;

        this.update();
        this.render();

        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * Update score display
     */
    updateScore() {
        this.scoreDisplay.textContent = `Score: ${this.score}`;
    }

    /**
     * End the game
     */
    endGame() {
        this.isRunning = false;
        this.gameOverScreen.style.display = 'block';
        this.finalScoreDisplay.textContent = this.score;

        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    /**
     * Show start message on canvas
     */
    showStartMessage() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            'Tap to Start',
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        // Additional hint
        this.ctx.font = '16px Arial';
        this.ctx.fillText(
            '(or press SPACE)',
            this.canvas.width / 2,
            this.canvas.height / 2 + 30
        );
    }
}
