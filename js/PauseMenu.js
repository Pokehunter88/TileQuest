export default class PauseMenu {
    constructor(game) {
        this.game = game;

        this.showing = false;

        this.volume = 0.5;

        this.selected = 0;
        this.buttonPadding = 4;

        document.addEventListener("click", (event) => {
            if (this.showing) {
                const rect = this.game.canvas.getBoundingClientRect();
                const x =
                    (192 / (rect.right - rect.left)) * (event.x - rect.left);
                const y =
                    (192 / (rect.right - rect.left)) * (event.y - rect.top);
                if (
                    x > 32 - this.buttonPadding &&
                    y > 107 - this.buttonPadding &&
                    x < 159 + this.buttonPadding &&
                    y < 120 + this.buttonPadding
                ) {
                    if (this.selected == 0) {
                        this.showing = false;
                    } else this.selected = 0;
                } else if (
                    x > 32 - this.buttonPadding &&
                    y > 126 - this.buttonPadding &&
                    x < 159 + this.buttonPadding &&
                    y < 139 + this.buttonPadding
                ) {
                    if (this.selected == 1) {
                        this.showing = false;
                        this.game.startScreen();
                    } else this.selected = 1;
                } else if (
                    x > 32 - this.buttonPadding &&
                    y > 147 - this.buttonPadding &&
                    x < 159 + this.buttonPadding &&
                    y < 164 + this.buttonPadding
                ) {
                    if (this.selected == 2) {
                        this.volume = Math.min(
                            Math.max((x - 36) / (155 - 36), 0),
                            1
                        );
                    } else this.selected = 2;
                }
            }
        });

        document.addEventListener("mousemove", (event) => {
            if (this.showing && event.buttons > 0) {
                const rect = this.game.canvas.getBoundingClientRect();
                const x =
                    (192 / (rect.right - rect.left)) * (event.x - rect.left);
                const y =
                    (192 / (rect.right - rect.left)) * (event.y - rect.top);
                if (
                    x > 32 - this.buttonPadding &&
                    y > 147 - this.buttonPadding &&
                    x < 159 + this.buttonPadding &&
                    y < 164 + this.buttonPadding
                ) {
                    if (this.selected == 2) {
                        this.volume = Math.min(
                            Math.max((x - 36) / (155 - 36), 0),
                            1
                        );
                    } else this.selected = 2;
                }
            }
        });

        document.addEventListener("touchmove", (event) => {
            if (this.showing) {
                const rect = this.game.canvas.getBoundingClientRect();
                const x =
                    (192 / (rect.right - rect.left)) * (event.changedTouches[0].clientX - rect.left);
                const y =
                    (192 / (rect.right - rect.left)) * (event.changedTouches[0].clientY - rect.top);
                if (
                    x > 32 - this.buttonPadding &&
                    y > 147 - this.buttonPadding &&
                    x < 159 + this.buttonPadding &&
                    y < 164 + this.buttonPadding
                ) {
                    if (this.selected == 2) {
                        this.volume = Math.min(
                            Math.max((x - 36) / (155 - 36), 0),
                            1
                        );
                    } else this.selected = 2;
                }
            }
        });
    }

    update() {
        if (this.showing) {
            if (this.selected == 2) {
                if (this.game.input.keysPressed.a) {
                    if (this.volume > 0) {
                        this.volume -= 0.1;

                        if (this.volume < 0) {
                            this.volume = 0;
                        }
                    }

                    this.game.input.keysPressed.a = false;
                } else if (this.game.input.keysPressed.d) {
                    if (this.volume < 1) {
                        this.volume += 0.1;

                        if (this.volume > 1) {
                            this.volume = 1;
                        }
                    }

                    this.game.input.keysPressed.d = false;
                }
            } else {
                if (this.game.input.keysPressed.space && this.selected == 0) {
                    this.showing = false;
                    this.game.input.keysPressed.space = false;
                }
                if (this.game.input.keysPressed.space && this.selected == 1) {
                    this.showing = false;
                    this.game.startScreen();
                    this.game.input.keysPressed.space = false;
                }
            }
            if (this.game.input.keysPressed.w) {
                this.selected--;
                if (this.selected < 0) {
                    this.selected = 2;
                }

                this.game.input.keysPressed.w = false;
            } else if (this.game.input.keysPressed.s) {
                this.selected++;
                if (this.selected > 2) {
                    this.selected = 0;
                }

                this.game.input.keysPressed.s = false;
            }

            this.game.ctx.drawImage(
                this.game.renderer.images.pauseMenu,
                0,
                0,
                192,
                176,
                0,
                0,
                192,
                176
            );

            this.game.ctx.drawImage(
                this.game.renderer.images.pauseMenu,
                this.selected == 0 ? 49 : 0,
                209,
                49,
                14,
                72,
                107,
                49,
                14
            );

            this.game.ctx.drawImage(
                this.game.renderer.images.pauseMenu,
                this.selected == 1 ? 39 : 0,
                223,
                39,
                14,
                77,
                126,
                39,
                14
            );

            this.game.ctx.fillStyle = "#e8ce85";
            this.game.ctx.fillRect(33, 159, 126 * this.volume, 5);

            this.game.ctx.drawImage(
                this.game.renderer.images.pauseMenu,
                this.selected == 2 ? 6 : 0,
                200,
                6,
                9,
                33 + 120 * this.volume,
                157,
                6,
                9
            );
        }
    }
}
