export default class Tiles {
    constructor(levels, ctx, renderer) {
        this.levels = levels;
        this.ctx = ctx;
        this.renderer = renderer;

        this.rules = [
            {
                x: 48,
                y: 32,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 48,
                y: 32,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 32,
                y: 48,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 48,
                y: 48,
                grid: [
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 32,
                y: 48,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 16,
                y: 16,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 32,
                y: 32,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 2, 0, 0],
                    [0, 0, 1, 0, 0],
                ]
            },
            {
                x: 0,
                y: 32,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 2, 2, 0],
                    [0, 0, 2, 1, 0],
                ]
            },
            {
                x: 16,
                y: 32,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 2, 2, 0, 0],
                    [0, 1, 2, 0, 0],
                ]
            },
            {
                x: 0,
                y: 48,
                grid: [
                    [0, 0, 2, 1, 0],
                    [0, 0, 0, 2, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 16,
                y: 48,
                grid: [
                    [0, 1, 2, 0, 0],
                    [0, 2, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 80,
                y: 48,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 2, 1, 0],
                    [0, 0, 1, 1, 0],
                ]
            },
            {
                x: 64,
                y: 48,
                grid: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 2, 0, 0],
                    [0, 1, 1, 0, 0],
                ]
            },
            {
                x: 80,
                y: 32,
                grid: [
                    [0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 64,
                y: 32,
                grid: [
                    [0, 1, 1, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 96,
                y: 48,
                grid: [
                    [0, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 96,
                y: 48,
                grid: [
                    [0, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                ]
            },
            {
                x: 112,
                y: 32,
                grid: [
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
            {
                x: 112,
                y: 32,
                grid: [
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                ]
            },
            {
                x: 128,
                y: 32,
                grid: [
                    [0, 0, 1, 0, 0],
                    [0, 1, 0, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            },
        ]
    }

    tileMatches(val, ty, tx, layout) {
        const row = layout[ty];
        const cell = row && row[tx];
        if (val === 0) return true;
        if (val === 1) return cell !== undefined && cell !== 0;
        if (val === 2) return cell === undefined || cell === 0;
        return false;
    }


    drawTiles() {
        const layout = this.levels.levelLayout;

        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                if (layout[y][x] == 0) {
                    for (let i = 0; i < this.rules.length; i++) {
                        const grid = this.rules[i].grid;
                        let ok = true;
                        for (let i = 0; i < 4 && ok; i++) {
                            for (let j = 0; j < 5 && ok; j++) {
                                if (i === 1 && j === 2) continue; // skip center
                                const val = grid[i][j];
                                const ty = y + (i - 1);
                                const tx = x + (j - 2);
                                if (!this.tileMatches(val, ty, tx, layout)) ok = false;
                            }
                        }

                        if (ok) {
                            this.ctx.drawImage(this.renderer.images.tiles, this.rules[i].x, this.rules[i].y + 0.05, 15.95, 15.95, x * 16, y * 16, 16, 16);
                        }
                    }
                }
            }
        }

        this.ctx.drawImage(this.renderer.images.tiles, 0, 16.05, 15.95, 15.95, this.levels.levels[this.levels.level].startX * 16, (this.levels.levels[this.levels.level].startY - 1) * 16, 16, 16);
    }
}