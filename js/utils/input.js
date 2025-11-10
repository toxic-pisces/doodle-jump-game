/**
 * Input Manager - Handles keyboard and touch input
 */
export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = {};
        this.touchActive = false;
        this.touchDirection = null; // 'left' or 'right'
        this.setupListeners();
    }

    /**
     * Setup keyboard and touch event listeners
     */
    setupListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleTouchStart(e);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleTouchMove(e);
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleTouchEnd(e);
        });

        // Mouse events for desktop testing
        this.canvas.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.touchActive) {
                this.handleMouseMove(e);
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            this.handleMouseUp(e);
        });

        this.canvas.addEventListener('mouseleave', (e) => {
            this.handleMouseUp(e);
        });
    }

    /**
     * Handle touch start
     */
    handleTouchStart(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;

            this.touchActive = true;
            this.updateTouchDirection(x);
        }
    }

    /**
     * Handle touch move
     */
    handleTouchMove(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;

            this.updateTouchDirection(x);
        }
    }

    /**
     * Handle touch end
     */
    handleTouchEnd(e) {
        this.touchActive = false;
        this.touchDirection = null;
    }

    /**
     * Handle mouse down (for desktop testing)
     */
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;

        this.touchActive = true;
        this.updateTouchDirection(x);
    }

    /**
     * Handle mouse move
     */
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;

        this.updateTouchDirection(x);
    }

    /**
     * Handle mouse up
     */
    handleMouseUp(e) {
        this.touchActive = false;
        this.touchDirection = null;
    }

    /**
     * Update touch direction based on x position
     */
    updateTouchDirection(x) {
        const centerX = this.canvas.width / 2;

        if (x < centerX) {
            this.touchDirection = 'left';
        } else {
            this.touchDirection = 'right';
        }
    }

    /**
     * Check if moving left
     */
    isMovingLeft() {
        return this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A'] ||
               (this.touchActive && this.touchDirection === 'left');
    }

    /**
     * Check if moving right
     */
    isMovingRight() {
        return this.keys['ArrowRight'] || this.keys['d'] || this.keys['D'] ||
               (this.touchActive && this.touchDirection === 'right');
    }

    /**
     * Check if a specific key is pressed
     */
    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    /**
     * Get all pressed keys
     */
    getKeys() {
        return this.keys;
    }

    /**
     * Get touch state
     */
    getTouchState() {
        return {
            active: this.touchActive,
            direction: this.touchDirection
        };
    }
}
