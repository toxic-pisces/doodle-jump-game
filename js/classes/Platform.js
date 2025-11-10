import { CONFIG } from '../config.js';

/**
 * Platform class - Handles platform logic and rendering
 */
export class Platform {
    constructor(x, y, width = CONFIG.PLATFORM.WIDTH) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = CONFIG.PLATFORM.HEIGHT;
    }

    /**
     * Draw the platform
     */
    draw(ctx) {
        ctx.fillStyle = CONFIG.PLATFORM.COLOR;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = CONFIG.PLATFORM.BORDER_COLOR;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Update platform position based on player movement
     */
    update(player, canvas) {
        // Move platforms down when player goes up (keep player in lower 40%)
        if (player.y < canvas.height * 0.6 && player.velocityY < 0) {
            this.y -= player.velocityY;
        }
    }

    /**
     * Check if platform is off screen
     */
    isOffScreen(canvas) {
        return this.y > canvas.height;
    }
}
