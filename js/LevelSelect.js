export default class LevelSelect {
    constructor(game) {
        this.game = game;
        this.unlockedLevel = Number(localStorage.getItem("unlockedLevel") ?? 0);
        this.page = Math.floor(this.unlockedLevel / 9);
        this.levelsPerPage = 9;
        this.totalLevels = 25 ?? this.game.levels.levels.length;
        this.totalPages = Math.ceil(this.totalLevels / this.levelsPerPage);
        this.buttonSize = 48;
        this.spacing = 5;
        this.startX = Math.floor((192 - (this.buttonSize * 3 + this.spacing * 2)) / 2);
        this.startY = 51;

        this.animationLength = 1;
        this.timers = {
            end: this.animationLength
        }

        this.onBackButton = false;
        this.currentLevel = this.unlockedLevel % 9;

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

        // back button
        if (y < 40 && y > 5 && x < 96) {
            if (this.onBackButton) {
                this.running = false;
                this.game.startScreen();
            }
            else {
                this.onBackButton = true;
            }
            return;
        }

        // left / right page buttons
        if (x < 20 && y > 60) {
            this.page = Math.max(this.page - 1, 0);
            return;
        }
        if (x > 172 && y > 60) {
            this.page = Math.min(this.page + 1, this.totalPages - 1);
            return;
        }

        // level buttons
        const col = Math.floor((x - this.startX) / (this.buttonSize + this.spacing));
        const row = Math.floor((y - this.startY) / (this.buttonSize + this.spacing));
        if (col >= 0 && col < 3 && row >= 0 && row < 3) {
            const bx = this.startX + col * (this.buttonSize + this.spacing);
            const by = this.startY + row * (this.buttonSize + this.spacing);
            if (
                x > bx &&
                y > by &&
                x < bx + this.buttonSize &&
                y < by + this.buttonSize
            ) {
                const index = this.page * this.levelsPerPage + row * 3 + col;
                if (index < this.totalLevels) {
                    if (this.currentLevel == row * 3 + col && !this.onBackButton) {
                        if (this.currentLevel + this.page * this.levelsPerPage <= this.unlockedLevel) {
                            this.timers.end = 0;
                        }
                    } else {
                        this.onBackButton = false;
                        this.currentLevel = row * 3 + col;
                    }
                }
            }
        }
    }

    update() {
        if (!this.running) {
            document.removeEventListener("click", this.clickEvent);
            return
        };

        if (
            this.timers.end >= this.animationLength
        ) {
            if (this.game.input.keysPressed.space) {
                if (this.onBackButton) {
                    this.game.startScreen();
                    this.game.input.keysPressed.space = false;
                    return;
                } else {
                    if (this.currentLevel + this.page * this.levelsPerPage <= this.unlockedLevel) {
                        this.timers.end = 0;
                    }
                }
            }
            if (this.onBackButton) {
                if (this.game.input.keysPressed.s) {
                    this.onBackButton = false;

                    this.game.input.keysPressed.s = false;
                }
            } else {
                if (this.game.input.keysPressed.w) {
                    if (this.currentLevel > 2) {
                        this.currentLevel -= 3;
                    } else {
                        this.onBackButton = true;
                    }

                    this.game.input.keysPressed.w = false;
                } else if (this.game.input.keysPressed.s) {
                    if ((this.page == this.totalPages - 1 && this.currentLevel < (this.totalLevels % 9 == 0 ? 9 : this.totalLevels % 9) - 3) || (this.page != this.totalPages - 1 && this.currentLevel < 6)) {
                        this.currentLevel += 3;
                    }

                    this.game.input.keysPressed.s = false;
                } else if (this.game.input.keysPressed.a) {
                    if (this.currentLevel > 0 && this.currentLevel % 3 != 0) {
                        this.currentLevel -= 1;
                    } else if (this.currentLevel % 3 == 0) {
                        this.page = Math.max(this.page - 1, 0);
                    }

                    this.game.input.keysPressed.a = false;
                } else if (this.game.input.keysPressed.d) {
                    if (this.currentLevel < 8 && this.currentLevel % 3 != 2 && (this.page == this.totalPages - 1 ? this.currentLevel < (this.totalLevels % 9 == 0 ? 9 : this.totalLevels % 9) - 1 : true)) {
                        this.currentLevel += 1;
                    } else if (this.currentLevel % 3 == 2) {
                        this.page = Math.min(this.page + 1, this.totalPages - 1);

                        if (this.page == this.totalPages - 1) {
                            this.currentLevel = Math.min((this.totalLevels % 9 == 0 ? 9 : this.totalLevels % 9) - 1, this.currentLevel)
                        }
                    }

                    this.game.input.keysPressed.d = false;
                }
            }
        }

        const delta = (window.performance.now() - this.game.lastFrame) / 1000;

        const ctx = this.game.ctx;

        this.game.ctx.drawImage(
            this.game.renderer.images.levelSelect,
            0,
            0,
            192,
            256,
        );

        ctx.fillStyle = "#e8ce85";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // page indicators

        for (let i = 0; i < this.levelsPerPage; i++) {
            const levelIndex = this.page * this.levelsPerPage + i;
            if (levelIndex >= this.totalLevels) break;
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = this.startX + col * (this.buttonSize + this.spacing);
            const y = this.startY + row * (this.buttonSize + this.spacing);

            ctx.fillStyle = i == this.currentLevel && !this.onBackButton ? "rgb(44, 45, 69, 0.4)" : "rgb(44, 45, 69, 0.8)";
            ctx.fillRect(x, y, this.buttonSize, this.buttonSize);
            ctx.fillStyle = "#e8ce85";

            if (levelIndex > 8) {
                this.game.ctx.drawImage(
                    this.game.renderer.images.levelSelectUI,
                    0 + Number((levelIndex + 1).toString()[0]) * 5,
                    0,
                    4,
                    7,
                    x + 19,
                    y + 7,
                    4,
                    7
                );

                this.game.ctx.drawImage(
                    this.game.renderer.images.levelSelectUI,
                    0 + Number((levelIndex + 1).toString()[1]) * 5,
                    0,
                    4,
                    7,
                    x + 25,
                    y + 7,
                    4,
                    7
                );
            } else {
                this.game.ctx.drawImage(
                    this.game.renderer.images.levelSelectUI,
                    5 + levelIndex * 5,
                    0,
                    4,
                    7,
                    x + 22,
                    y + 7,
                    4,
                    7
                );
            }

            if (levelIndex < this.unlockedLevel) {
                this.game.ctx.drawImage(
                    this.game.renderer.images.levelSelectUI,
                    13,
                    8,
                    16,
                    14,
                    x + 8,
                    y + 18,
                    32,
                    28
                );
            } else if (levelIndex == this.unlockedLevel) {
                this.game.ctx.drawImage(
                    this.game.renderer.images.levelSelectUI,
                    0,
                    11,
                    12,
                    11,
                    x + 12,
                    y + 21,
                    24,
                    22
                );
            } else if (levelIndex > this.unlockedLevel) {
                this.game.ctx.drawImage(
                    this.game.renderer.images.levelSelectUI,
                    30,
                    10,
                    12,
                    12,
                    x + 12,
                    y + 20,
                    24,
                    24
                );
            }
        }

        if (this.page > 0) {
            this.game.ctx.drawImage(
                this.game.renderer.images.levelSelectUI,
                50,
                0,
                9,
                18,
                7,
                119,
                9,
                18
            );
        }

        if (this.page + 1 < this.totalPages) {
            this.game.ctx.drawImage(
                this.game.renderer.images.levelSelectUI,
                60,
                0,
                9,
                18,
                176,
                119,
                9,
                18
            );
        }

        if (this.onBackButton) {
            this.game.ctx.drawImage(
                this.game.renderer.images.levelSelectUI,
                70,
                0,
                27,
                18,
                16,
                14,
                27,
                18
            );
        }

        if (this.endAnimation(delta)) {
            return;
        }

        this.game.lastFrame = window.performance.now();
        requestAnimationFrame(() => this.update());
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
                if (this.onBackButton) {
                    this.game.startScreen();
                } else {
                    this.game.start(this.currentLevel + this.page * this.levelsPerPage);
                }

                document.removeEventListener("click", this.clickEvent);
                return true;
            }
        }

        return false;
    }
}
