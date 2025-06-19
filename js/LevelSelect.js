export default class LevelSelect {
    constructor(game) {
        this.game = game;
        this.page = 0;
        this.levelsPerPage = 9;
        this.totalPages = Math.ceil(this.game.levels.levels.length / this.levelsPerPage);
        this.buttonSize = 40;
        this.spacing = 8;
        this.startX = Math.floor((192 - (this.buttonSize * 3 + this.spacing * 2)) / 2);
        this.startY = 40;

        document.addEventListener("click", (event) => {
            const rect = this.game.canvas.getBoundingClientRect();
            const x = (192 / (rect.right - rect.left)) * (event.x - rect.left);
            const y = (192 / (rect.right - rect.left)) * (event.y - rect.top);

            // back button
            if (x > 4 && y > 4 && x < 36 && y < 20) {
                this.game.startScreen();
                return;
            }

            // left / right page buttons
            if (x < 20 && y > 120 && y < 136) {
                this.page = (this.page - 1 + this.totalPages) % this.totalPages;
                return;
            }
            if (x > 172 && y > 120 && y < 136) {
                this.page = (this.page + 1) % this.totalPages;
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
                    if (index < this.game.levels.levels.length) {
                        this.game.start(index);
                    }
                }
            }
        });

        requestAnimationFrame(() => this.update());
    }

    update() {
        const ctx = this.game.ctx;
        ctx.fillStyle = "#0f0f1d";
        ctx.fillRect(0, 0, 192, 256);

        ctx.fillStyle = "#e8ce85";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // back button
        ctx.fillText("Back", 20, 12);

        // page indicators
        ctx.fillText("<", 10, 128);
        ctx.fillText(">", 182, 128);
        ctx.fillText(`${this.page + 1}/${this.totalPages}`, 96, 20);

        for (let i = 0; i < this.levelsPerPage; i++) {
            const levelIndex = this.page * this.levelsPerPage + i;
            if (levelIndex >= this.game.levels.levels.length) break;
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = this.startX + col * (this.buttonSize + this.spacing);
            const y = this.startY + row * (this.buttonSize + this.spacing);

            ctx.strokeStyle = "#e8ce85";
            ctx.strokeRect(x, y, this.buttonSize, this.buttonSize);
            ctx.fillText(levelIndex + 1, x + this.buttonSize / 2, y + this.buttonSize / 2);
        }

        this.game.lastFrame = Date.now();
        requestAnimationFrame(() => this.update());
    }
}
