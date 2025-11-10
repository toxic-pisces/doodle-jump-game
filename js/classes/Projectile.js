import { CONFIG } from '../config.js';

/**
 * Projectile class - Handles enemy projectiles
 */
export class Projectile {
    constructor(x, y, targetX, targetY) {
        this.width = CONFIG.PROJECTILE.WIDTH;
        this.height = CONFIG.PROJECTILE.HEIGHT;
        this.x = x;
        this.y = y;

        // Calculate direction towards target
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize and apply speed
        this.velocityX = (dx / distance) * CONFIG.PROJECTILE.SPEED;
        this.velocityY = (dy / distance) * CONFIG.PROJECTILE.SPEED;
    }

    /**
     * Draw the projectile
     */
    draw(ctx) {
        ctx.save();

        // Draw projectile as a glowing circle
        const gradient = ctx.createRadialGradient(
            this.x + this.width / 2,
            this.y + this.height / 2,
            0,
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width / 2
        );
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(0.5, CONFIG.PROJECTILE.COLOR);
        gradient.addColorStop(1, '#8e0000');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }

    /**
     * Update projectile position
     */
    update(player, canvas) {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Move with player when player goes up
        if (player.y < canvas.height / 2 && player.velocityY < 0) {
            this.y -= player.velocityY;
        }
    }

    /**
     * Check collision with player
     */
    checkCollision(player) {
        return (
            this.x + this.width > player.x &&
            this.x < player.x + player.width &&
            this.y + this.height > player.y &&
            this.y < player.y + player.height
        );
    }

    /**
     * Check if projectile is off screen
     */
    isOffScreen(canvas) {
        return (
            this.x + this.width < 0 ||
            this.x > canvas.width ||
            this.y + this.height < 0 ||
            this.y > canvas.height
        );
    }
}
