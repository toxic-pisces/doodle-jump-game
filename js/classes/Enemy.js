import { CONFIG } from '../config.js';
import { Projectile } from './Projectile.js';

/**
 * Enemy class - Handles enemy AI, movement, and shooting
 */
export class Enemy {
    constructor(x, y) {
        this.width = CONFIG.ENEMY.WIDTH;
        this.height = CONFIG.ENEMY.HEIGHT;
        this.x = x;
        this.y = y;
        this.velocityX = CONFIG.ENEMY.MOVE_SPEED;
        this.lastShot = Date.now();
        this.shootInterval = CONFIG.ENEMY.SHOOT_INTERVAL;
    }

    /**
     * Draw the enemy
     */
    draw(ctx) {
        ctx.save();

        // Draw enemy body (angry square/monster)
        ctx.fillStyle = CONFIG.ENEMY.COLOR;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw border
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Draw angry eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x + 7, this.y + 8, 8, 8);
        ctx.fillRect(this.x + 20, this.y + 8, 8, 8);

        // Draw pupils (looking towards player would be cool but let's keep it simple)
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 9, this.y + 10, 4, 4);
        ctx.fillRect(this.x + 22, this.y + 10, 4, 4);

        // Draw angry eyebrows
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x + 7, this.y + 7);
        ctx.lineTo(this.x + 15, this.y + 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + 28, this.y + 7);
        ctx.lineTo(this.x + 20, this.y + 10);
        ctx.stroke();

        // Draw angry mouth (zigzag)
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x + 10, this.y + 25);
        ctx.lineTo(this.x + 13, this.y + 22);
        ctx.lineTo(this.x + 16, this.y + 25);
        ctx.lineTo(this.x + 19, this.y + 22);
        ctx.lineTo(this.x + 22, this.y + 25);
        ctx.lineTo(this.x + 25, this.y + 22);
        ctx.stroke();

        ctx.restore();
    }

    /**
     * Update enemy position and behavior
     */
    update(player, canvas) {
        // Horizontal movement (patrol)
        this.x += this.velocityX;

        // Bounce off screen edges
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.velocityX = -this.velocityX;
        }

        // Move with player when player goes up
        if (player.y < canvas.height / 2 && player.velocityY < 0) {
            this.y -= player.velocityY;
        }
    }

    /**
     * Check if enemy should shoot
     */
    shouldShoot() {
        const now = Date.now();
        if (now - this.lastShot >= this.shootInterval) {
            this.lastShot = now;
            return true;
        }
        return false;
    }

    /**
     * Create a projectile aimed at the player
     */
    shoot(player) {
        const projectileX = this.x + this.width / 2 - CONFIG.PROJECTILE.WIDTH / 2;
        const projectileY = this.y + this.height / 2 - CONFIG.PROJECTILE.HEIGHT / 2;
        const targetX = player.x + player.width / 2;
        const targetY = player.y + player.height / 2;

        return new Projectile(projectileX, projectileY, targetX, targetY);
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
     * Check if enemy is off screen
     */
    isOffScreen(canvas) {
        // Only remove if off bottom of screen
        // Keep enemies that are above screen (they will scroll down)
        return this.y > canvas.height + 100;
    }
}
