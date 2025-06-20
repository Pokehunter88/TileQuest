export default class Renderer {
    constructor(levels, player, ctx, game) {
        this.levels = levels;
        this.player = player;
        this.ctx = ctx;
        this.game = game;

        this.images = {
            startScreen: new Image(),
            restartMenu: new Image(),
            pauseMenu: new Image(),
            levelSelect: new Image(),
            levelSelectUI: new Image(),
            tiles: new Image(),
            player: new Image(),
            collect: new Image(),
            lighting: new Image(),
            key: new Image(),
        };

        this.images.startScreen.src = "assets/Start Screen.png";
        this.images.restartMenu.src = "assets/Restart Menu.png";
        this.images.pauseMenu.src = "assets/Pause Menu.png";
        this.images.levelSelect.src = "assets/Level Select.png";
        this.images.levelSelectUI.src = "assets/Level Select UI.png";
        this.images.tiles.src = "assets/Tile Sheet.png";
        this.images.player.src = "assets/Player Sheet.png";
        this.images.collect.src = "assets/Collect.png";
        this.images.lighting.src = "assets/Lighting.png";
        this.images.key.src = "assets/KeySheet.png";

        this.animationLength = 1;

        this.timers = {
            start: 0,
            end: this.animationLength,
            key: 0,
        };
    }

    update(delta) {
        this.drawLighting();
        this.startAnimation(delta);
        this.endAnimation(delta);

        this.timers.key += delta;

        if (this.timers.key > Math.PI) {
            this.timers.key = 0;
        }
    }

    drawLighting() {
        this.ctx.drawImage(
            this.images.lighting,
            this.player.playerSpriteX - 216,
            this.player.playerSpriteY - 220,
        );
    }

    startAnimation(delta) {
        if (
            this.timers.start < this.animationLength &&
            this.timers.end >= this.animationLength
        ) {
            this.ctx.fillStyle = "#0f0f1d";
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

        if (this.timers.start < this.animationLength) {
            this.timers.start += delta;
        }
    }

    endAnimation(delta) {
        if (this.timers.end < this.animationLength) {
            for (let i = 0; i < 15; i++) {
                if (
                    this.timers.end > 0.2 &&
                    this.timers.end < (this.animationLength / 40) * i + 0.2
                ) {
                    this.ctx.drawImage(
                        this.images.collect,
                        i * 48,
                        0,
                        48,
                        48,
                        this.player.tileX * 16 - 16,
                        this.player.tileY * 16 - 20,
                        48,
                        48
                    );
                    break;
                }
            }

            this.ctx.fillStyle = "#0f0f1d";
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
