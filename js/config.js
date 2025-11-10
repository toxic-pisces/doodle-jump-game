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
        COLOR: '#ff6b6b',
        JETPACK: {
            CHARGE_TIME: 5000, // 5 seconds to charge
            FLIGHT_TIME: 5000, // 5 seconds of flight
            THRUST_POWER: -15, // Upward force
            FUEL_REGEN_RATE: 1 // % per frame when not in use (5 seconds = ~300 frames at 60fps)
        }
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
        SHIELD: {
            SPAWN_CHANCE: 0.15, // 15% chance
            DURATION: 5000, // 5 seconds invincibility
            COLOR: '#3498db' // Blue
        },
        EXTRA_LIFE: {
            SPAWN_CHANCE: 0.10, // 10% chance
            COLOR: '#e74c3c' // Red heart
        }
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
