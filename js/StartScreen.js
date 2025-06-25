import LevelSelect from "./LevelSelect.js";

export default class StartScreen {
    constructor(game) {
        this.game = game;

        this.animationLength = 1;

        this.timers = {
            main: 0,
            cursor: 0,
            button1: 1,
            button2: 0,
            button3: 0,
            end: this.animationLength,
        };

        this.currentButton = 0;
        this.buttonPadding = 5;

        this.restartMenuShowing = false;
        this.restartMenuButton = false;

        this.running = true;

        this.clickEvent = this.clickEvent.bind(this);

        document.addEventListener("click", this.clickEvent);

        requestAnimationFrame(() => this.update());
    }

    clickEvent(event) {
        if (this.timers.end < this.animationLength) return;
        
        const rect = this.game.canvas.getBoundingClientRect();
        const x = (192 / (rect.right - rect.left)) * (event.x - rect.left);
        const y = (192 / (rect.right - rect.left)) * (event.y - rect.top);
        if (this.restartMenuShowing) {
            if (
                x > 88 - this.buttonPadding &&
                y > 131 - this.buttonPadding &&
                x < 102 + this.buttonPadding &&
                y < 136 + this.buttonPadding
            ) {
                if (this.restartMenuButton) {
                    this.timers.end = 0;
                } else this.restartMenuButton = true;
            } else if (
                x > 91 - this.buttonPadding &&
                y > 143 - this.buttonPadding &&
                x < 100 + this.buttonPadding &&
                y < 148 + this.buttonPadding
            ) {
                if (!this.restartMenuButton) {
                    this.restartMenuShowing = false;
                } else this.restartMenuButton = false;
            }
        } else {
            if (
                x > 56 - this.buttonPadding &&
                y > 116 - this.buttonPadding &&
                x < 138 + this.buttonPadding &&
                y < 128 + this.buttonPadding
            ) {
                if (this.currentButton == 0) {
                    this.newGame();
                } else this.currentButton = 0;
            } else if (
                x > 60 - this.buttonPadding &&
                y > 144 - this.buttonPadding &&
                x < 134 + this.buttonPadding &&
                y < 156 + this.buttonPadding
            ) {
                if (this.currentButton == 1) {
                    this.timers.end = 0;
                } else this.currentButton = 1;
            } else if (
                x > 30 - this.buttonPadding &&
                y > 172 - this.buttonPadding &&
                x < 154 + this.buttonPadding &&
                y < 184 + this.buttonPadding
            ) {
                if (this.currentButton == 2) {
                    this.running = false;
                    new LevelSelect(this.game);
                } else this.currentButton = 2;
            }
        }
    }

    newGame() {
        this.game.input.keysPressed.space = false;

        if ((localStorage.getItem("unlockedLevel") ?? 0) != 0) {
            this.restartMenuShowing = true;
        } else {
            this.timers.end = 0;
        }
    }

    update() {
        if (!this.running) {
            document.removeEventListener("click", this.clickEvent);
            return
        };

        if (
            this.timers.end >= this.animationLength &&
            !this.restartMenuShowing
        ) {
            if (this.game.input.keysPressed.space && this.currentButton == 0) {
                this.newGame();
            }
            if (this.game.input.keysPressed.space && this.currentButton == 1) {
                this.timers.end = 0;
            }
            if (this.game.input.keysPressed.space && this.currentButton == 2) {
                // this.timers.end = 0;

                new LevelSelect(this.game);
                this.game.input.keysPressed.space = false;
                return;
            }
            if (this.game.input.keysPressed.w) {
                this.currentButton--;
                if (this.currentButton < 0) {
                    this.currentButton = 2;
                }

                this.game.input.keysPressed.w = false;
            } else if (this.game.input.keysPressed.s) {
                this.currentButton++;
                if (this.currentButton > 2) {
                    this.currentButton = 0;
                }

                this.game.input.keysPressed.s = false;
            }
        }

        for (let i = 0; i < 24; i++) {
            if (this.timers.main > i * 0.1) {
                this.game.ctx.drawImage(
                    this.game.renderer.images.startScreen,
                    i * 192,
                    0,
                    192,
                    256,
                    0,
                    0,
                    192,
                    256
                );
            }
        }

        this.game.ctx.drawImage(
            this.game.renderer.images.startScreen,
            56,
            372,
            82,
            12,
            56 - this.timers.button1 * 2.5,
            116 - this.timers.button1 * 0.5,
            82 + this.timers.button1 * 5,
            12 + this.timers.button1 * 1
        );

        this.game.ctx.drawImage(
            this.game.renderer.images.startScreen,
            252,
            400,
            74,
            12,
            60 - this.timers.button2 * 2.5,
            144 - this.timers.button2 * 0.5,
            74 + this.timers.button2 * 5,
            12 + this.timers.button2 * 1
        );

        this.game.ctx.drawImage(
            this.game.renderer.images.startScreen,
            414,
            428,
            124,
            12,
            30 - this.timers.button3 * 3,
            172 - this.timers.button3 * 0.5,
            124 + this.timers.button3 * 6,
            12 + this.timers.button3 * 1
        );

        let cursorPos;

        switch (this.currentButton) {
            case 0:
                cursorPos = [46, 118];
                break;
            case 1:
                cursorPos = [50, 146];
                break;
            default:
                cursorPos = [20, 174];
                break;
        }

        this.game.ctx.drawImage(
            this.game.renderer.images.startScreen,
            576,
            256,
            6,
            8,
            cursorPos[0] + Math.sin(this.timers.cursor * 3) - 2,
            cursorPos[1],
            6,
            8
        );

        if (this.restartMenuShowing) {
            this.restartMenu();
        }

        const delta = (window.performance.now() - this.game.lastFrame) / 1000;

        this.timers.main += delta;
        this.timers.cursor += delta;

        if (this.currentButton == 0 && this.timers.button1 < 1) {
            this.timers.button1 += delta * 5;

            if (this.timers.button1 > 1) {
                this.timers.button1 = 1;
            }
        }
        if (this.currentButton != 0 && this.timers.button1 > 0) {
            this.timers.button1 -= delta * 5;

            if (this.timers.button1 < 0) {
                this.timers.button1 = 0;
            }
        }

        if (this.currentButton == 1 && this.timers.button2 < 1) {
            this.timers.button2 += delta * 5;

            if (this.timers.button2 > 1) {
                this.timers.button2 = 1;
            }
        }
        if (this.currentButton != 1 && this.timers.button2 > 0) {
            this.timers.button2 -= delta * 5;

            if (this.timers.button2 < 0) {
                this.timers.button2 = 0;
            }
        }

        if (this.currentButton == 2 && this.timers.button3 < 1) {
            this.timers.button3 += delta * 5;

            if (this.timers.button3 > 1) {
                this.timers.button3 = 1;
            }
        }
        if (this.currentButton != 2 && this.timers.button3 > 0) {
            this.timers.button3 -= delta * 5;

            if (this.timers.button3 < 0) {
                this.timers.button3 = 0;
            }
        }

        if (this.timers.main > 2.4) {
            this.timers.main = 0;
        }

        if (this.endAnimation(delta)) {
            return;
        }

        this.game.lastFrame = window.performance.now();

        requestAnimationFrame(() => this.update());
    }

    restartMenu() {
        if (this.timers.end >= this.animationLength) {
            if (this.game.input.keysPressed.space && this.restartMenuButton) {
                this.timers.end = 0;
                this.game.input.keysPressed.space = false;
            }
            if (this.game.input.keysPressed.space && !this.restartMenuButton) {
                this.restartMenuShowing = false;
                this.game.input.keysPressed.space = false;
            }
            if (this.game.input.keysPressed.w) {
                this.restartMenuButton = !this.restartMenuButton;

                this.game.input.keysPressed.w = false;
            } else if (this.game.input.keysPressed.s) {
                this.restartMenuButton = !this.restartMenuButton;

                this.game.input.keysPressed.s = false;
            }

            this.game.ctx.drawImage(
                this.game.renderer.images.restartMenu,
                0,
                0
            );

            this.game.ctx.drawImage(
                this.game.renderer.images.startScreen,
                576,
                256,
                6,
                8,
                (this.restartMenuButton ? 78 : 81) +
                Math.sin(this.timers.cursor * 3) -
                2,
                this.restartMenuButton ? 130 : 142,
                6,
                8
            );
        }
    }

    endAnimation(delta) {
        if (this.timers.end < this.animationLength) {
            this.game.ctx.fillStyle = "#0f0f1d";
            this.game.ctx.fillRect(
                0,
                0,
                192,
                (this.timers.end / this.animationLength) * 128
            );
            this.game.ctx.fillRect(
                0,
                256 - (this.timers.end / this.animationLength) * 128,
                192,
                (this.timers.end / this.animationLength) * 128
            );

            this.timers.end += delta;

            if (this.timers.end >= this.animationLength) {
                if (this.currentButton == 0) {
                    localStorage.setItem("level", 0);
                    localStorage.setItem("unlockedLevel", 0);
                    this.game.start(0);
                } else if (this.currentButton == 1) {
                    this.game.start(Number(localStorage.getItem("level") ?? 0));
                } else if (this.currentButton == 2) {
                    new LevelSelect(this.game);
                }

                document.removeEventListener("click", this.clickEvent);
                return true;
            }
        }

        return false;
    }
}
