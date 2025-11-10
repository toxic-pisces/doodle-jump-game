/**
 * Collectible class - Handles boost items on platforms
 */
export class Collectible {
    constructor(x, y, type = 'boost') {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = type;
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

        // Save context
        ctx.save();

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
            this.x + this.width / 2,
            this.y + this.height / 2,
            0,
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width
        );
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width * 2,
            this.height * 2
        );

        // Floating animation
        const floatY = this.y + Math.sin(this.animationOffset) * 3;

        // Draw star/boost icon
        this.drawStar(ctx, this.x + this.width / 2, floatY + this.height / 2, this.width / 2);

        ctx.restore();
    }

    /**
     * Draw a star shape
     */
    drawStar(ctx, cx, cy, radius) {
        const spikes = 5;
        const outerRadius = radius;
        const innerRadius = radius / 2;

        ctx.beginPath();
        ctx.fillStyle = '#FFD700'; // Gold color
        ctx.strokeStyle = '#FFA500'; // Orange outline
        ctx.lineWidth = 2;

        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Add center circle for extra detail
        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.arc(cx, cy, radius / 4, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Update collectible position based on player movement
     */
    update(player, canvas) {
        // Move collectible down when player goes up
        if (player.y < canvas.height / 2 && player.velocityY < 0) {
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
     * Get boost power based on type
     */
    getBoostPower() {
        switch (this.type) {
            case 'boost':
                return -20; // Strong upward boost
            default:
                return -15;
        }
    }

    /**
     * Check if collectible is off screen
     */
    isOffScreen(canvas) {
        return this.y > canvas.height;
    }
}
