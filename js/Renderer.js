export default class Renderer {
    constructor(levels, player, ctx, game) {
        this.levels = levels;
        this.player = player;
        this.ctx = ctx;
        this.game = game;

        this.images = {
            tiles: new Image(),
            player: new Image(),
            confetti: new Image(),
        };

        this.images.tiles.src = "assets/Tile Sheet.png";
        this.images.player.src = "assets/Player Sheet.png";
        this.images.confetti.src = "assets/Confetti.png";

        this.animationLength = 1;

        this.timers = {
            start: 0,
            finish: this.animationLength,
        };
    }

    drawTiles() {
        for (let y = 0; y < this.levels.levelLayout.length; y++) {
            for (let x = 0; x < this.levels.levelLayout[y].length; x++) {
                if (
                    this.levels.levelLayout[y][x] == 1 ||
                    this.levels.levelLayout[y][x] == 2
                ) {
                    this.ctx.drawImage(
                        this.images.tiles,
                        0,
                        0,
                        16,
                        16,
                        x * 16,
                        y * 16,
                        16,
                        16
                    );
                } else if (this.levels.levelLayout[y][x] == 5) {
                    this.ctx.drawImage(
                        this.images.tiles,
                        16,
                        0,
                        16,
                        16,
                        x * 16,
                        y * 16,
                        16,
                        16
                    );
                } else if (this.levels.levelLayout[y][x] == 3) {
                    this.ctx.drawImage(
                        this.images.tiles,
                        48,
                        0,
                        16,
                        16,
                        x * 16,
                        y * 16,
                        16,
                        16
                    );
                } else if (this.levels.levelLayout[y][x] == 4) {
                    this.ctx.drawImage(
                        this.images.tiles,
                        32,
                        0,
                        16,
                        16,
                        x * 16,
                        y * 16,
                        16,
                        16
                    );
                }
            }
        }
    }

    update(delta) {
        if (
            this.timers.start < this.animationLength &&
            this.timers.end >= this.animationLength
        ) {
            this.ctx.fillStyle = "#1E1F3B";
            this.ctx.fillRect(
                0,
                0,
                192,
                128 - (this.timers.start / this.animationLength) * 128
            );
            this.ctx.fillRect(
                0,
                128 + (this.timers.start / this.animationLength) * 128,
                192,
                128 - (this.timers.start / this.animationLength) * 128
            );
        }

        if (this.timers.end < this.animationLength) {
            this.ctx.fillStyle = "#1E1F3B";
            this.ctx.fillRect(
                0,
                0,
                192,
                (this.timers.end / this.animationLength) * 128
            );
            this.ctx.fillRect(
                0,
                256 - (this.timers.end / this.animationLength) * 128,
                192,
                (this.timers.end / this.animationLength) * 128
            );

            // for (let i = 0; i < 10; i++) {
            //     if (
            //         this.finishAnimationFrame > 20 &&
            //         this.finishAnimationFrame < 25 + i * 5
            //     ) {
            //         this.ctx.drawImage(
            //             this.images.confetti,
            //             i * 48,
            //             0,
            //             48,
            //             48,
            //             this.player.tileX * 16 - 16,
            //             this.player.tileY * 16 - 20,
            //             48,
            //             48
            //         );
            //         break;
            //     }
            // }
        }

        if (this.timers.start < this.animationLength) {
            this.timers.start += delta;
        }
        if (this.timers.end < this.animationLength) {
            this.timers.end += delta;

            if (this.timers.end >= this.animationLength) {
                this.levels.level++;
                if (this.levels.level >= this.levels.levels.length) {
                    this.levels.level = 0;
                }
                this.game.restart();
                this.timers.start = 0;
                document.documentElement.style.setProperty(
                    "--canvas-scale",
                    this.levels.getZoom(this.levels.level)
                );
            }
        }
    }

    restart() {
        this.timers.end = this.animationLength;
    }

    nextLevel() {
        this.timers.end = 0;
        this.timers.start = 0;
    }
}
