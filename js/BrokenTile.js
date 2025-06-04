export default class BrokenTile {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.tileX = x;
        this.tileY = y;

        this.particles = [];

        for (let i = 0; i < 10; i++) {
            this.particles.push([
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
            ]);
        }

        this.fadeOutTime = 2;

        this.time = 0;
    }

    update(delta) {
        for (let i = 0; i < this.particles.length; i++) {
            if (
                this.particles[i][2] / 2 +
                    0.5 -
                    (this.time - this.fadeOutTime) *
                        (this.particles[i][3] / 2 + 0.5) <
                0
            ) {
                this.particles.splice(i, i);
            } else if (this.time < this.fadeOutTime) {
                this.ctx.fillStyle = `rgba(${this.particles[i][0] * 30 + 71}, ${
                    this.particles[i][0] * 30 + 71
                }, ${this.particles[i][0] * 30 + 71}, 1)`;

                this.ctx.fillRect(
                    this.tileX * 16 + this.particles[i][0] * 16,
                    this.tileY * 16 + this.particles[i][1] * 16,
                    (this.particles[i][2] / 2 + 0.5) * 2,
                    (this.particles[i][2] / 2 + 0.5) * 2
                );
            } else {
                this.ctx.fillStyle = `rgba(${this.particles[i][0] * 30 + 71}, ${
                    this.particles[i][0] * 30 + 71
                }, ${this.particles[i][0] * 30 + 71}, 1)`;

                this.ctx.fillRect(
                    this.tileX * 16 +
                        this.particles[i][0] * 16 +
                        (this.time - this.fadeOutTime) *
                            (this.particles[i][3] / 2 + 0.5),
                    this.tileY * 16 +
                        this.particles[i][1] * 16 +
                        (this.time - this.fadeOutTime) *
                            (this.particles[i][3] / 2 + 0.5),
                    (this.particles[i][2] / 2 +
                        0.5 -
                        (this.time - this.fadeOutTime) *
                            (this.particles[i][3] / 2 + 0.5)) *
                        2,
                    (this.particles[i][2] / 2 +
                        0.5 -
                        (this.time - this.fadeOutTime) *
                            (this.particles[i][3] / 2 + 0.5)) *
                        2
                );
            }
        }

        this.time += delta;
    }
}
