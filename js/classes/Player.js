import { CONFIG } from '../config.js';
import { SKINS, DEFAULT_SKIN } from '../skins.js';

/**
 * Player class - Handles player character logic and rendering
 */
export class Player {
    constructor(canvas, skinId = DEFAULT_SKIN) {
        this.canvas = canvas;
        this.width = CONFIG.PLAYER.WIDTH;
        this.height = CONFIG.PLAYER.HEIGHT;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 150;
        this.velocityY = 0;
        this.velocityX = 0;
        this.gravity = CONFIG.PLAYER.GRAVITY;
        this.jumpPower = CONFIG.PLAYER.JUMP_POWER;
        this.moveSpeed = CONFIG.PLAYER.MOVE_SPEED;
        this.skin = SKINS[skinId] || SKINS[DEFAULT_SKIN];
        this.invincible = false;
        this.invincibleUntil = 0;
    }

    /**
     * Draw the player character
     */
    draw(ctx) {
        ctx.save();

        // Draw shield glow if invincible
        if (this.invincible) {
            const gradient = ctx.createRadialGradient(
                this.x + this.width / 2,
                this.y + this.height / 2,
                0,
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.width * 1.5
            );
            gradient.addColorStop(0, 'rgba(52, 152, 219, 0.4)');
            gradient.addColorStop(1, 'rgba(52, 152, 219, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(
                this.x - this.width / 2,
                this.y - this.height / 2,
                this.width * 2,
                this.height * 2
            );

            // Pulsing shield border
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 200) * 0.3;
            ctx.strokeRect(this.x - 3, this.y - 3, this.width + 6, this.height + 6);
            ctx.globalAlpha = 1;
        }

        // Draw player body with current skin color
        ctx.fillStyle = this.skin.bodyColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw eyes
        ctx.fillStyle = this.skin.eyeColor;
        ctx.fillRect(this.x + 8, this.y + 10, 10, 10);
        ctx.fillRect(this.x + 22, this.y + 10, 10, 10);

        ctx.fillStyle = this.skin.pupilColor;
        ctx.fillRect(this.x + 12, this.y + 14, 4, 4);
        ctx.fillRect(this.x + 26, this.y + 14, 4, 4);

        // Draw smile
        ctx.strokeStyle = this.skin.mouthColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 25, 8, 0, Math.PI);
        ctx.stroke();

        ctx.restore();
    }

    /**
     * Change player skin
     */
    setSkin(skinId) {
        if (SKINS[skinId]) {
            this.skin = SKINS[skinId];
        }
    }

    /**
     * Update player position and physics
     */
    update(keys, platforms, inputManager) {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Keep player from going too high
        if (this.y < CONFIG.PLAYER.MAX_HEIGHT) {
            this.y = CONFIG.PLAYER.MAX_HEIGHT;
        }

        // Handle horizontal movement
        this.handleMovement(keys, inputManager);

        // Check collision with platforms
        this.checkPlatformCollision(platforms);

        // Check if player fell off screen
        return this.y <= this.canvas.height;
    }

    /**
     * Handle player horizontal movement
     */
    handleMovement(keys, inputManager) {
        // Check keyboard or touch input
        if (inputManager.isMovingLeft()) {
            this.velocityX = -this.moveSpeed;
        } else if (inputManager.isMovingRight()) {
            this.velocityX = this.moveSpeed;
        } else {
            this.velocityX = 0;
        }

        this.x += this.velocityX;

        // Wrap around screen
        if (this.x > this.canvas.width) {
            this.x = -this.width;
        } else if (this.x < -this.width) {
            this.x = this.canvas.width;
        }
    }

    /**
     * Check collision with platforms
     */
    checkPlatformCollision(platforms) {
        if (this.velocityY > 0) {
            platforms.forEach(platform => {
                if (
                    this.x + this.width > platform.x &&
                    this.x < platform.x + platform.width &&
                    this.y + this.height > platform.y &&
                    this.y + this.height < platform.y + platform.height &&
                    this.velocityY > 0
                ) {
                    this.velocityY = this.jumpPower;
                }
            });
        }
    }

    /**
     * Check if player is still alive
     */
    isAlive() {
        return this.y <= this.canvas.height;
    }

    /**
     * Activate invincibility shield
     */
    activateShield(duration) {
        this.invincible = true;
        this.invincibleUntil = Date.now() + duration;
    }

    /**
     * Check and update invincibility status
     */
    updateInvincibility() {
        if (this.invincible && Date.now() >= this.invincibleUntil) {
            this.invincible = false;
        }
    }

    /**
     * Check if player is currently invincible
     */
    isInvincible() {
        this.updateInvincibility();
        return this.invincible;
    }
}
