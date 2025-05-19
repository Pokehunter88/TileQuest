export default class Input {
    constructor(game) {
        this.game = game;
        this.player = null;

        this.keysPressed = {
            w: false,
            s: false,
            a: false,
            d: false
        };

        document.addEventListener("keydown", (event) => this.keyDown(event));
        document.addEventListener("keyup", (event) => this.keyUp(event));

        this.startX;
        this.startY;

        document.addEventListener('touchstart', (event) => this.touchStart(event));
        document.addEventListener('touchmove', (event) => this.touchMove(event));
    }

    keyDown(event) {
        if (event.code === "KeyR") {
            this.game.restart();
        } else if (event.code === "KeyW") {
            this.keysPressed.w = true;
        } else if (event.code === "KeyS") {
            this.keysPressed.s = true;
        } else if (event.code === "KeyA") {
            this.keysPressed.a = true;
        } else if (event.code === "KeyD") {
            this.keysPressed.d = true;
        }
    }

    keyUp(event) {
        if (event.code === "KeyW") {
            this.keysPressed.w = false;
        } else if (event.code === "KeyS") {
            this.keysPressed.s = false;
        } else if (event.code === "KeyA") {
            this.keysPressed.a = false;
        } else if (event.code === "KeyD") {
            this.keysPressed.d = false;
        }
    }

    touchStart(event) {
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
    }

    touchMove(event) {
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const deltaX = endX - this.startX;
        const deltaY = endY - this.startY;

        // Check if it's a swipe (minimal distance threshold)
        const swipeThreshold = 50;
        if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
            // Determine swipe direction
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 0) {
                    this.player?.move("right");
                } else {
                    this.player?.move("left");
                }
            } else {
                // Vertical swipe
                if (deltaY > 0) {
                    this.player?.move("down");
                } else {
                    this.player?.move("up");
                }
            }
        }
    }
}