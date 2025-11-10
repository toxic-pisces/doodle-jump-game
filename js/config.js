// Game Configuration Constants
export const CONFIG = {
    // Canvas dimensions
    CANVAS_WIDTH: 400,
    CANVAS_HEIGHT: 700,

    // Player settings
    PLAYER: {
        WIDTH: 40,
        HEIGHT: 40,
        GRAVITY: 0.4,
        JUMP_POWER: -12,
        MOVE_SPEED: 5,
        MAX_HEIGHT: 100, // Prevents player from going too high
        COLOR: '#ff6b6b'
    },

    // Platform settings
    PLATFORM: {
        WIDTH: 60,
        HEIGHT: 12,
        COLOR: '#4CAF50',
        BORDER_COLOR: '#2E7D32',
        SPACING_MIN: 70,
        SPACING_VARIANCE: 30,
        INITIAL_COUNT: 8
    },

    // Scoring
    SCORE: {
        POINTS_PER_PLATFORM: 10
    },

    // Lives
    LIVES: {
        INITIAL_LIVES: 3
    },

    // Collectibles
    COLLECTIBLE: {
        SPAWN_CHANCE: 0.25, // 25% chance to spawn on a platform
        BOOST_POWER: -20 // Strong upward velocity
    },

    // Enemies
    ENEMY: {
        WIDTH: 35,
        HEIGHT: 35,
        SPAWN_CHANCE: 0.30, // 30% chance to spawn
        MOVE_SPEED: 1.5,
        SHOOT_INTERVAL: 2000, // Shoot every 2 seconds
        COLOR: '#e74c3c'
    },

    // Projectiles
    PROJECTILE: {
        WIDTH: 8,
        HEIGHT: 8,
        SPEED: 4,
        COLOR: '#c0392b'
    }
};
