import { CONFIG } from '../config.js';

/**
 * Collectible class - Handles collectible items (shield, extra life)
 */
export class Collectible {
    constructor(x, y, type = 'shield') {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.type = type; // 'shield' or 'extra_life'
        this.collected = false;
        this.animationOffset = 0;
        this.animationSpeed = 0.1;
    }

    /**
     * Draw the collectible
     */
    draw(ctx) {
        if (this.collected) return;

        // Update animation
        this.animationOffset += this.animationSpeed;

        // Floating animation
        const floatY = this.y + Math.sin(this.animationOffset) * 3;

        // Save context
        ctx.save();

        // Draw glow effect
        const glowColor = this.type === 'shield'
            ? 'rgba(52, 152, 219, 0.5)'
            : 'rgba(231, 76, 60, 0.5)';

        const gradient = ctx.createRadialGradient(
            this.x + this.width / 2,
            floatY + this.height / 2,
            0,
            this.x + this.width / 2,
            floatY + this.height / 2,
            this.width
        );
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(
            this.x - this.width / 2,
            floatY - this.height / 2,
            this.width * 2,
            this.height * 2
        );

        // Draw icon based on type
        if (this.type === 'shield') {
            this.drawShield(ctx, this.x + this.width / 2, floatY + this.height / 2);
        } else if (this.type === 'extra_life') {
            this.drawHeart(ctx, this.x + this.width / 2, floatY + this.height / 2);
        }

        ctx.restore();
    }

    /**
     * Draw a shield icon
     */
    drawShield(ctx, cx, cy) {
        const size = this.width / 2;

        // Shield outline
        ctx.beginPath();
        ctx.moveTo(cx, cy - size);
        ctx.quadraticCurveTo(cx + size, cy - size / 2, cx + size, cy);
        ctx.quadraticCurveTo(cx + size, cy + size, cx, cy + size * 1.3);
        ctx.quadraticCurveTo(cx - size, cy + size, cx - size, cy);
        ctx.quadraticCurveTo(cx - size, cy - size / 2, cx, cy - size);
        ctx.closePath();

        // Fill shield
        ctx.fillStyle = CONFIG.COLLECTIBLE.SHIELD.COLOR;
        ctx.fill();

        // Shield border
        ctx.strokeStyle = '#2980b9';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add cross detail
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx, cy + size / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - size / 2, cy);
        ctx.lineTo(cx + size / 2, cy);
        ctx.stroke();
    }

    /**
     * Draw a heart icon
     */
    drawHeart(ctx, cx, cy) {
        const size = this.width / 2.5;

        ctx.beginPath();
        ctx.fillStyle = CONFIG.COLLECTIBLE.EXTRA_LIFE.COLOR;

        // Left half of heart
        ctx.moveTo(cx, cy + size / 2);
        ctx.bezierCurveTo(
            cx, cy + size / 4,
            cx - size, cy - size / 4,
            cx - size / 2, cy - size / 2
        );
        ctx.bezierCurveTo(
            cx - size, cy - size,
            cx - size * 0.3, cy - size,
            cx, cy
        );

        // Right half of heart
        ctx.bezierCurveTo(
            cx + size * 0.3, cy - size,
            cx + size, cy - size,
            cx + size / 2, cy - size / 2
        );
        ctx.bezierCurveTo(
            cx + size, cy - size / 4,
            cx, cy + size / 4,
            cx, cy + size / 2
        );

        ctx.closePath();
        ctx.fill();

        // Heart outline
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(cx - size / 4, cy - size / 4, size / 4, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Update collectible position based on player movement
     */
    update(player, canvas) {
        // Move collectible down when player goes up (keep player in lower 40%)
        if (player.y < canvas.height * 0.6 && player.velocityY < 0) {
            this.y -= player.velocityY;
        }
    }

    /**
     * Check collision with player
     */
    checkCollision(player) {
        if (this.collected) return false;

        return (
            player.x + player.width > this.x &&
            player.x < this.x + this.width &&
            player.y + player.height > this.y &&
            player.y < this.y + this.height
        );
    }

    /**
     * Collect the item
     */
    collect() {
        this.collected = true;
    }

    /**
     * Get the type of collectible
     */
    getType() {
        return this.type;
    }

    /**
     * Check if collectible is off screen
     */
    isOffScreen(canvas) {
        return this.y > canvas.height;
    }
}
