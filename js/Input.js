export default class Input {
    constructor(game) {
        this.game = game;
        this.player = null;

        this.keysPressed = {
            w: false,
            s: false,
            a: false,
            d: false,
            space: false,
        };

        document.addEventListener("keydown", (event) => this.keyDown(event));
        document.addEventListener("keyup", (event) => this.keyUp(event));

        this.startX;
        this.startY;

        document.addEventListener("touchstart", (event) =>
            this.touchStart(event)
        );
        document.addEventListener("touchmove", (event) =>
            this.touchMove(event)
        );
    }

    keyDown(event) {
        if (event.code === "KeyR") {
            this.game.restart();
        } else if (event.code === "Escape") {
            if (this.game.playing) {
                this.game.pauseMenu.showing = !this.game.pauseMenu.showing;

                if (this.game.pauseMenu.showing) {
                    this.game.pauseMenu.selected = 0;
                }
            }
        } else if (event.code === "KeyW" || event.code === "ArrowUp") {
            this.keysPressed.w = true;
        } else if (event.code === "KeyS" || event.code === "ArrowDown") {
            this.keysPressed.s = true;
        } else if (event.code === "KeyA" || event.code === "ArrowLeft") {
            this.keysPressed.a = true;
        } else if (event.code === "KeyD" || event.code === "ArrowRight") {
            this.keysPressed.d = true;
        } else if (event.code === "Space" || event.code === "Enter") {
            this.keysPressed.space = true;
        }
    }

    keyUp(event) {
        if (event.code === "KeyW" || event.code === "ArrowUp") {
            this.keysPressed.w = false;
        } else if (event.code === "KeyS" || event.code === "ArrowDown") {
            this.keysPressed.s = false;
        } else if (event.code === "KeyA" || event.code === "ArrowLeft") {
            this.keysPressed.a = false;
        } else if (event.code === "KeyD" || event.code === "ArrowRight") {
            this.keysPressed.d = false;
        } else if (event.code === "Space" || event.code === "Enter") {
            this.keysPressed.space = false;
        }
    }

    touchStart(event) {
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
    }

    touchMove(event) {
        if (this.game.playing) {
            const deltaX = event.changedTouches[0].clientX - this.startX;
            const deltaY = event.changedTouches[0].clientY - this.startY;

            const swipeThreshold = 50;
            if (
                Math.abs(deltaX) > swipeThreshold ||
                Math.abs(deltaY) > swipeThreshold
            ) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (deltaX > 0) {
                        this.player?.move("right");
                    } else {
                        this.player?.move("left");
                    }
                } else {
                    if (deltaY > 0) {
                        this.player?.move("down");
                    } else {
                        this.player?.move("up");
                    }
                }
            }
        }
    }
}
